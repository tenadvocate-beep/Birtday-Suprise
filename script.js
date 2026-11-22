

// =================================
// CONFETTI
// =================================

function launchConfetti() {
  const container = document.getElementById("confettiContainer");

  if (!container) return;

  container.innerHTML = "";

  const colors = [
    "#ff3b5c",
    "#ff8fa3",
    "#ffd9e0",
    "#ffffff",
    "#b51e43",
    "#c98a98"
  ];

  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty("--fall-time", 3 + Math.random() * 3 + "s");
    piece.style.setProperty("--fall-delay", Math.random() * 1.5 + "s");
    piece.style.setProperty("--drift", (Math.random() * 200 - 100) + "px");

    container.appendChild(piece);
  }
}


// =================================
// BIRTHDAY CONFIGURATION
// =================================

const BIRTHDATE = "1997-11-26";


// =================================
// ELEMENTS
// =================================

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");
const unlockButton = document.getElementById("unlockButton");
const waiting = document.getElementById("waiting");

const entrance = document.getElementById("entrance");
const celebration = document.getElementById("celebration");
const curtains = document.getElementById("curtains");

const birthdaySong = document.getElementById("birthdaySong");
const mainSong = document.getElementById("mainSong");


// NEW INTRO SCREENS

const welcomeScreen = document.getElementById("welcomeScreen");
const memoriesCarousel = document.getElementById("memoriesCarousel");

// =================================
// MEMORIES PHOTO CAROUSEL
// =================================

const memoryPhotos = [
  "memory1.jpg",
  "memory2.jpg",
  "memory3.jpg",
  "memory4.jpg",
  "memory5.jpg",
  "memory6.jpg"
];

if (memoriesCarousel) {
  memoriesCarousel.innerHTML = "";

  memoryPhotos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = "memory-placeholder";

    const img = document.createElement("img");
    img.src = `assests/memories/${photo}`;
    img.alt = `Memory ${index + 1}`;

    slide.appendChild(img);
    memoriesCarousel.appendChild(slide);
  });
}

// =================================
// ACTIVE MEMORY ON SWIPE
// =================================

if (memoriesCarousel) {
  function updateActiveMemory() {
    const slides = memoriesCarousel.querySelectorAll(".memory-placeholder");
    const carouselCenter =
      memoriesCarousel.getBoundingClientRect().left +
      memoriesCarousel.clientWidth / 2;

    let closestSlide = null;
    let closestDistance = Infinity;

    slides.forEach(slide => {
      const slideCenter =
        slide.getBoundingClientRect().left +
        slide.offsetWidth / 2;

      const distance = Math.abs(carouselCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlide = slide;
      }

      slide.classList.remove("is-active");
    });

    if (closestSlide) {
      closestSlide.classList.add("is-active");
    }
  }

  memoriesCarousel.addEventListener("scroll", updateActiveMemory);
  window.addEventListener("resize", updateActiveMemory);

  updateActiveMemory();
}

const birthdayCounterScreen = document.getElementById("birthdayCounterScreen");
const memoriesScreen = document.getElementById("memoriesScreen");

const startBirthday = document.getElementById("startBirthday");
const counterNext = document.getElementById("counterNext");
const memoriesContinue = document.getElementById("memoriesContinue");

let unlocked = false;
let counterIntervals = [];


// =================================
// INTRO SCREEN NAVIGATION
// =================================

function hideIntroScreens() {
  [
    welcomeScreen,
    birthdayCounterScreen,
    memoriesScreen
  ].forEach(screen => {
    if (screen) screen.classList.add("hidden");
  });
}


function showIntroScreen(screen) {
  hideIntroScreens();

  if (screen) {
    screen.classList.remove("hidden");
  }
}


// =================================
// BIRTHDAY AGE COUNTER
// =================================

function calculateAge() {
  const birth = new Date(BIRTHDATE + "T00:00:00");
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;

    const previousMonthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    days += previousMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}


function animateCounter(elementId, target) {
  const element = document.getElementById(elementId);

  if (!element) return;

  let current = 0;
  element.textContent = "0";

  const interval = setInterval(() => {
    current++;

    element.textContent = Math.min(current, target);

    if (current >= target) {
      clearInterval(interval);
    }
  }, 45);

  counterIntervals.push(interval);
}


function startBirthdayCounter() {
  counterIntervals.forEach(clearInterval);
  counterIntervals = [];

  const age = calculateAge();

  animateCounter("counterYears", age.years);
  animateCounter("counterMonths", age.months);
  animateCounter("counterDays", age.days);
}


// =================================
// START THE BIRTHDAY EXPERIENCE
// =================================

if (startBirthday) {
  startBirthday.addEventListener("click", () => {
    showIntroScreen(birthdayCounterScreen);
    startBirthdayCounter();
  });
}


if (counterNext) {
  counterNext.addEventListener("click", () => {
    showIntroScreen(memoriesScreen);
  });
}


if (memoriesContinue) {
  memoriesContinue.addEventListener("click", () => {
    hideIntroScreens();
    startCelebration();
  });
}


// =================================
// THEATRE CURTAINS
// =================================

function openTheatreCurtains() {
  if (!curtains) return;

  curtains.classList.remove("gone", "open");
  curtains.classList.add("active");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        curtains.classList.add("open");
      }, 400);
    });
  });

  setTimeout(() => {
    curtains.classList.add("gone");
    curtains.classList.remove("active");
  }, 3200);
}


// =================================
// MAIN BIRTHDAY CELEBRATION
// =================================

function startCelebration() {
  if (celebration) {
    celebration.classList.remove("hidden");
  }

  launchConfetti();
  openTheatreCurtains();
}


// =================================
// MUSIC TRANSITION
// =================================

function startMusicTransition() {
  if (!birthdaySong || !mainSong) return;

  setTimeout(() => {
    const fadeOut = setInterval(() => {
      if (birthdaySong.volume > 0.05) {
        birthdaySong.volume = Math.max(
          0,
          birthdaySong.volume - 0.05
        );
      } else {
        clearInterval(fadeOut);

        birthdaySong.pause();
        birthdaySong.currentTime = 0;
        birthdaySong.volume = 1;

        mainSong.volume = 0;

        mainSong.play().then(() => {
          const fadeIn = setInterval(() => {
            if (mainSong.volume < 0.95) {
              mainSong.volume = Math.min(
                1,
                mainSong.volume + 0.05
              );
            } else {
              mainSong.volume = 1;
              clearInterval(fadeIn);
            }
          }, 150);
        }).catch(() => {
          console.log("Main song could not play.");
        });
      }
    }, 150);
  }, 30000);
}


// =================================
// PASSWORD AND BIRTHDAY ENTRANCE
// =================================

if (passwordForm) {
  passwordForm.addEventListener("submit", event => {
    event.preventDefault();

    if (unlocked) return;

    if (passwordInput.value.trim() !== "2611") {
      if (error) {
        error.textContent =
          "Oops! Wrong password. Try again, birthday girl 🤍";
      }

      passwordInput.value = "";
      passwordInput.focus();
      return;
    }

    unlocked = true;

    if (error) error.textContent = "";

    if (passwordInput) passwordInput.disabled = true;

    if (unlockButton) {
      unlockButton.disabled = true;
      unlockButton.textContent = "SURPRISE UNLOCKED! ♡";
    }

    if (waiting) {
      waiting.textContent = "Your birthday magic is starting... ✨";
    }

    // Start birthday music

    if (birthdaySong) {
      birthdaySong.volume = 1;

      birthdaySong.play().catch(() => {
        console.log("Birthday song file is not available.");
      });
    }

    // Hide password screen

    if (entrance) {
      entrance.classList.add("hidden");
    }

    // Show new welcome screen

    showIntroScreen(welcomeScreen);

    // Keep the original 30-second music transition

    startMusicTransition();
  });
}


// =================================
// OPEN THE BIRTHDAY LETTER
// =================================

const openLetterButton = document.getElementById("openLetterButton");
const envelopeScene = document.getElementById("envelopeScene");
const letterHint = document.getElementById("letterHint");

if (openLetterButton) {
  openLetterButton.addEventListener("click", () => {
    if (!envelopeScene || envelopeScene.classList.contains("open")) return;

    openLetterButton.classList.add("open");
    envelopeScene.classList.add("open");

    openLetterButton.setAttribute("aria-expanded", "true");

    if (letterHint) {
      letterHint.textContent =
        "A little piece of my heart, just for you ♡";
    }
  });
}


// =================================
// LUXURY RAFFLE
// =================================

const goToRaffle = document.getElementById("goToRaffle");
const rafflePage = document.getElementById("rafflePage");
const raffleWheel = document.getElementById("raffleWheel");
const spinButton = document.getElementById("spinButton");
const raffleResult = document.getElementById("raffleResult");
const prizeResult = document.getElementById("prizeResult");


const prizes = [
  "A delicious Shawarma 🌯",
  "A yummy Burger 🍔",
  "₦5,000 Cash 💸",
  "A sweet Peck on the Forehead 😘",
  "Ice Cream! 🍦"
];

let hasSpun = false;




// OPEN RAFFLE PAGE

if (goToRaffle) {
  goToRaffle.addEventListener("click", () => {

    if (!celebration || !rafflePage) return;

    celebration.classList.add("hidden");
    rafflePage.classList.remove("hidden");

    rafflePage.scrollIntoView({
      behavior: "smooth"
    });
  });
}

// SPIN THE WHEEL


if (spinButton) {
  spinButton.addEventListener("click", () => {
    if (hasSpun || !raffleWheel) return;

    hasSpun = true;

    spinButton.disabled = true;
    spinButton.textContent = "YOUR SURPRISE IS ON ITS WAY...";

    const selectedIndex = Math.floor(Math.random() * prizes.length);

    const segmentAngle = 72;
const extraSpins = 6;

const targetRotation =
  (360 - (selectedIndex * segmentAngle)) % 360;

const finalRotation =
  (extraSpins * 360) + targetRotation;
    raffleWheel.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {
      if (prizeResult) {
        prizeResult.textContent = prizes[selectedIndex];
      }

      if (raffleResult) {
        raffleResult.classList.remove("hidden");
      }

      spinButton.textContent = "YOUR GIFT HAS BEEN REVEALED ♡";
    }, 5200);
  });
}

// =================================
// OPEN THE PHOTO GALLERY
// =================================

const openGallery = document.getElementById("openGallery");
const galleryPage = document.getElementById("galleryPage");

if (openGallery) {
  openGallery.addEventListener("click", () => {
    if (!rafflePage || !galleryPage) return;

    rafflePage.classList.add("hidden");
    galleryPage.classList.remove("hidden");

    galleryPage.scrollIntoView({
      behavior: "smooth"
    });
  });
}


// =================================
// LOAD GALLERY PHOTOS
// =================================

const galleryGrid = document.getElementById("galleryGrid");

const galleryPhotos = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg"
];

const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");
const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const photoCounter = document.getElementById("photoCounter");

let currentPhotoIndex = 0;


// SHOW SELECTED PHOTO

function showPhoto(index) {
  if (galleryPhotos.length === 0 || !viewerImage) return;

  currentPhotoIndex =
    (index + galleryPhotos.length) % galleryPhotos.length;

  viewerImage.src =
    `assests/gallery/${galleryPhotos[currentPhotoIndex]}`;

  if (photoCounter) {
    photoCounter.textContent =
      `${currentPhotoIndex + 1} / ${galleryPhotos.length}`;
  }
}


// CREATE GALLERY ITEMS

if (galleryGrid) {
  galleryPhotos.forEach((photo, index) => {
    const galleryItem = document.createElement("div");

    galleryItem.className = "gallery-item";

    const image = document.createElement("img");

    image.src = `assests/gallery/${photo}`;
    image.alt = `Memory ${index + 1}`;
    image.loading = "lazy";

    galleryItem.appendChild(image);
    galleryGrid.appendChild(galleryItem);

    // OPEN PHOTO VIEWER

    galleryItem.addEventListener("click", () => {
      showPhoto(index);

      if (photoViewer) {
        photoViewer.classList.remove("hidden");
      }
    });
  });
}


// =================================
// PHOTO VIEWER CONTROLS
// =================================

// CLOSE VIEWER

if (closeViewer) {
  closeViewer.addEventListener("click", () => {
    if (photoViewer) {
      photoViewer.classList.add("hidden");
    }
  });
}


// PREVIOUS PHOTO

if (previousPhoto) {
  previousPhoto.addEventListener("click", () => {
    showPhoto(currentPhotoIndex - 1);
  });
}


// NEXT PHOTO

if (nextPhoto) {
  nextPhoto.addEventListener("click", () => {
    showPhoto(currentPhotoIndex + 1);
  });
}


// CLOSE WHEN BACKGROUND IS CLICKED

if (photoViewer) {
  photoViewer.addEventListener("click", event => {
    if (event.target === photoViewer) {
      photoViewer.classList.add("hidden");
    }
  });
}


// KEYBOARD CONTROLS

document.addEventListener("keydown", event => {
  if (!photoViewer || photoViewer.classList.contains("hidden")) return;

  if (event.key === "Escape") {
    photoViewer.classList.add("hidden");
  }

  if (event.key === "ArrowRight") {
    showPhoto(currentPhotoIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    showPhoto(currentPhotoIndex - 1);
  }
});
// =================================
// BACK BUTTON NAVIGATION
// =================================

const backNavigation = {
  welcomeBack: ["welcomeScreen", "passwordScreen"],
  counterBack: ["birthdayCounterScreen", "welcomeScreen"],
  memoryBack: ["memoriesScreen", "birthdayCounterScreen"],
  raffleBack: ["rafflePage", "celebration"],
  galleryBack: ["galleryPage", "rafflePage"]
};

Object.entries(backNavigation).forEach(([buttonId, pages]) => {
  const button = document.getElementById(buttonId);
  const currentPage = document.getElementById(pages[0]);
  const previousPage = document.getElementById(pages[1]);

  if (button && currentPage && previousPage) {
    button.addEventListener("click", () => {
      currentPage.classList.add("hidden");
      previousPage.classList.remove("hidden");
    });
  }
});
// BACK FROM BIRTHDAY CELEBRATION

const celebrationBack = document.getElementById("celebrationBack");

if (celebrationBack) {
  celebrationBack.addEventListener("click", () => {
    celebration.classList.add("hidden");
    memoriesScreen.classList.remove("hidden");

    memoriesScreen.scrollIntoView({
      behavior: "smooth"
    });
  });
}
// =================================
// FLOATING ROSE PETALS
// =================================

const petalContainer = document.getElementById("petalContainer");

let petalsStarted = false;

function startRosePetals() {
  if (!petalContainer || petalsStarted) return;

  petalsStarted = true;

  for (let i = 0; i < 22; i++) {
    const petal = document.createElement("span");

    petal.classList.add("rose-petal");

    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = (12 + Math.random() * 10) + "s";
    petal.style.animationDelay = (Math.random() * -20) + "s";
    petal.style.opacity = 0.4 + Math.random() * 0.5;
    petal.style.width = (10 + Math.random() * 10) + "px";
    petal.style.height = (15 + Math.random() * 12) + "px";

    petalContainer.appendChild(petal);
  }
}

// Start petals when the birthday celebration appears
const celebrationObserver = new MutationObserver(() => {
  if (
    celebration &&
    !celebration.classList.contains("hidden")
  ) {
    startRosePetals();
    celebrationObserver.disconnect();
  }
});

if (celebration) {
  celebrationObserver.observe(celebration, {
    attributes: true,
    attributeFilter: ["class"]
  });

  if (!celebration.classList.contains("hidden")) {
    startRosePetals();
    celebrationObserver.disconnect();
  }
}
// =================================
// FINAL BIRTHDAY SURPRISE
// =================================

const showFinalSurprise = document.getElementById("showFinalSurprise");
const finalSurprisePage = document.getElementById("finalSurprisePage");

if (showFinalSurprise && finalSurprisePage) {
  showFinalSurprise.addEventListener("click", () => {

    galleryPage.classList.add("hidden");
    finalSurprisePage.classList.remove("hidden");

    finalSurprisePage.scrollIntoView({
      behavior: "smooth"
    });
  });
}
// BACK TO GALLERY FROM FINAL SURPRISE

const finalBack = document.getElementById("finalBack");

if (finalBack) {
  finalBack.addEventListener("click", () => {
    finalSurprisePage.classList.add("hidden");
    galleryPage.classList.remove("hidden");

    galleryPage.scrollIntoView({
      behavior: "smooth"
    });
  });
}

// ======================================================
// MENÚ HAMBURGUESA
// ======================================================
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// ======================================================
// TEMA DÍA / NOCHE (ÉPOCA SECA / HÚMEDA) CON MEMORIA
// ======================================================
const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "zoonosis-theme";

function applyTheme(mode) {
  const icon = themeToggle ? themeToggle.querySelector("i") : null;

  if (mode === "night") {
    document.body.classList.add("theme-night");
    if (icon) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-cloud-rain");
    }
  } else {
    document.body.classList.remove("theme-night");
    if (icon) {
      icon.classList.remove("fa-cloud-rain");
      icon.classList.add("fa-sun");
    }
  }
}

// Al cargar la página: leer el modo guardado
if (themeToggle) {
  const savedTheme = localStorage.getItem(THEME_KEY) || "day";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isNight = document.body.classList.contains("theme-night");
    const newMode = isNight ? "day" : "night";
    applyTheme(newMode);
    localStorage.setItem(THEME_KEY, newMode);
  });
} else {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "night") {
    document.body.classList.add("theme-night");
  }
}

// ======================================================
// CARRUSEL HERO (página inicio)
// ======================================================
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let heroCurrentSlide = 0;
let heroIntervalId = null;

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  heroSlides.forEach((slide) => slide.classList.remove("hero-slide--active"));
  heroDots.forEach((dot) => dot.classList.remove("hero-dot--active"));

  heroCurrentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[heroCurrentSlide].classList.add("hero-slide--active");
  heroDots[heroCurrentSlide].classList.add("hero-dot--active");
}

function startHeroAutoPlay() {
  if (!heroSlides.length) return;
  // Evitar duplicar intervalos
  if (heroIntervalId) clearInterval(heroIntervalId);
  heroIntervalId = setInterval(() => {
    showHeroSlide(heroCurrentSlide + 1);
  }, 5000); // cambia cada 5 segundos
}

if (heroSlides.length && heroDots.length && heroPrev && heroNext) {
  heroPrev.addEventListener("click", () => {
    showHeroSlide(heroCurrentSlide - 1);
    startHeroAutoPlay();
  });

  heroNext.addEventListener("click", () => {
    showHeroSlide(heroCurrentSlide + 1);
    startHeroAutoPlay();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroAutoPlay();
    });
  });

  // Iniciar autoplay solo en la página que tiene el carrusel
  startHeroAutoPlay();
}

// ======================================================
// CARRUSEL (página campana)
// ======================================================
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

if (prevBtn && nextBtn && slides.length && dots.length) {
  prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
  nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
}

// ======================================================
// COMENTARIOS (página comentarios)
// ======================================================
const sendBtn = document.getElementById("send");
const commentsContainer = document.getElementById("comments");

if (sendBtn && commentsContainer) {
  sendBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) return;

    const card = document.createElement("article");
    card.className = "comment-card";

    const header = document.createElement("div");
    header.className = "comment-header";

    const strong = document.createElement("strong");
    strong.textContent = name;

    const date = document.createElement("span");
    date.textContent = new Date().toLocaleDateString();

    header.appendChild(strong);
    header.appendChild(date);

    const p = document.createElement("p");
    p.textContent = message;

    card.appendChild(header);
    card.appendChild(p);

    const empty = commentsContainer.querySelector(".empty-state");
    if (empty) empty.remove();

    commentsContainer.appendChild(card);

    nameInput.value = "";
    messageInput.value = "";
  });
}
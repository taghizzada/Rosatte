// --- HERO SLIDER ---
(function () {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return; // ✅ Prevent error on pages without slider

  const slides = [...slider.querySelectorAll(".slide")];
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  const dotsWrap = slider.querySelector(".hero-dots");

  let i = 0,
    timer;

  slides.forEach((_, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    b.addEventListener("click", () => go(idx, true));
    dotsWrap.appendChild(b);
  });

  function go(idx) {
    slides[i].classList.remove("is-active");
    i = (idx + slides.length) % slides.length;
    slides[i].classList.add("is-active");
    [...dotsWrap.children].forEach((d, di) =>
      d.setAttribute("aria-selected", di === i ? "true" : "false")
    );
  }

  function next() {
    go(i + 1);
  }
  function prev() {
    go(i - 1);
  }
  function start() {
    timer = setInterval(next, 5000);
  }
  function stop() {
    clearInterval(timer);
  }

  go(0);
  start();

  nextBtn.addEventListener("click", () => {
    go(i + 1);
    stop();
  });
  prevBtn.addEventListener("click", () => {
    go(i - 1);
    stop();
  });

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      go(i + 1);
      stop();
    }
    if (e.key === "ArrowLeft") {
      go(i - 1);
      stop();
    }
  });

  let sx = null;
  slider.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      stop();
    },
    { passive: true }
  );

  slider.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) {
      go(i + (dx < 0 ? 1 : -1));
      stop();
    }
    sx = null;
  });

  const loyaltyBtn = document.getElementById("loyalty-btn");
  if (loyaltyBtn) {
    loyaltyBtn.addEventListener("click", function () {
      this.textContent = "✔ Added to the Order";
      this.disabled = true;
    });
  }
})();

// --- HAMBURGER MENU TOGGLE ---
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

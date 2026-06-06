const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = `${value}+`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = `${target}+`;
      }
    };

    requestAnimationFrame(update);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.8 });

document.querySelectorAll("[data-count]").forEach((counter) => {
  counterObserver.observe(counter);
});

document.getElementById("contact-form").addEventListener("submit", (event) => {
  const form = event.currentTarget;
  const note = form.querySelector(".form-note");
  const submitButton = form.querySelector("button[type='submit']");

  note.textContent = "Sending your message to Praveen...";
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
});

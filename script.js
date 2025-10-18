// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => (preloader.style.display = "none"), 400);
  }, 500); // small delay for smoother fade-out
});

// Show current year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle with memory
const toggle = document.getElementById("theme-toggle");
if (toggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    toggle.textContent = "☀️ Light";
  }
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      toggle.textContent = "☀️ Light";
      localStorage.setItem("theme", "dark");
    } else {
      toggle.textContent = "🌙 Dark";
      localStorage.setItem("theme", "light");
    }
  });
}

// Formspree redirect
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // Disable submit button to prevent double submission
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        window.location.href = "thankyou.html";
      } else {
        alert("❌ Oops! There was a problem sending your message.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    } catch (error) {
      alert("❌ Network error, please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

// Scroll reveal with stagger
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      setTimeout(() => el.classList.add("active"), i * 100);
    }
  });
});

// Custom cursor glow
const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Cursor hover effect on buttons and links
const hoverElements = document.querySelectorAll("a, button");
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

// --- ✅ NEW FEATURES BELOW ---

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburger.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
  });

  // Auto-close when clicking a link
  navMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.textContent = "☰";
    })
  );
}

// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// Hero image fix for small screens
const hero = document.querySelector(".hero");
if (hero) {
  hero.style.backgroundPosition = "center";
  hero.style.backgroundSize = "cover";
  hero.style.backgroundRepeat = "no-repeat";
}

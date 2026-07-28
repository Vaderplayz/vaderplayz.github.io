// ===============================
// Mobile menu toggle
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// ===============================
// Project detail navigation
// ===============================
const projectDetails = [
  {
    card: document.querySelector("#projects .project-card:nth-child(1)"),
    url: "projects/dual-lidar-uav.html",
    label: "Open the full Dual-2D-LiDAR UAV project page"
  },
  {
    card: document.querySelector("#projects .project-card:nth-child(2)"),
    url: "projects/teensy-quadcopter.html",
    label: "Open the full Teensy 4.1 quadcopter project page"
  }
];

projectDetails.forEach(({ card, url, label }) => {
  if (!card) return;

  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", label);
  card.style.cursor = "pointer";

  const projectLinks = card.querySelector(".project-links");
  if (projectLinks && !projectLinks.querySelector(".project-detail-link")) {
    const detailLink = document.createElement("a");
    detailLink.href = url;
    detailLink.className = "project-detail-link";
    detailLink.textContent = "Full Project Page";
    projectLinks.prepend(detailLink);
  }

  const openDetailPage = () => {
    window.location.href = url;
  };

  card.addEventListener("click", event => {
    if (event.target.closest("a")) return;
    openDetailPage();
  });

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetailPage();
    }
  });
});

// ===============================
// Reveal on scroll animation
// ===============================
const faders = document.querySelectorAll(".fade-up");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  faders.forEach(el => observer.observe(el));
} else {
  faders.forEach(el => el.classList.add("show"));
}

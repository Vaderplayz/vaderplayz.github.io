// ===============================
// Mobile menu toggle
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// ===============================
// Project detail navigation
// ===============================
const flagshipProject = document.querySelector("#projects .project-card");

if (flagshipProject) {
  const detailUrl = "projects/dual-lidar-uav.html";
  flagshipProject.setAttribute("role", "link");
  flagshipProject.setAttribute("tabindex", "0");
  flagshipProject.setAttribute(
    "aria-label",
    "Open the full Dual-2D-LiDAR UAV project page"
  );
  flagshipProject.style.cursor = "pointer";

  // Add a visible detail-page link without replacing the existing GitHub/video links.
  const projectLinks = flagshipProject.querySelector(".project-links");
  if (projectLinks && !projectLinks.querySelector(".project-detail-link")) {
    const detailLink = document.createElement("a");
    detailLink.href = detailUrl;
    detailLink.className = "project-detail-link";
    detailLink.textContent = "Full Project Page";
    projectLinks.prepend(detailLink);
  }

  const openDetailPage = () => {
    window.location.href = detailUrl;
  };

  flagshipProject.addEventListener("click", event => {
    // Preserve the behavior of GitHub, YouTube, and other links inside the card.
    if (event.target.closest("a")) return;
    openDetailPage();
  });

  flagshipProject.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetailPage();
    }
  });
}

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

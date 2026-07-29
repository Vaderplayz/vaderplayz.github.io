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
// Certifications section
// ===============================
const contactSection = document.getElementById("contact");

if (contactSection && !document.getElementById("certifications")) {
  const style = document.createElement("style");
  style.textContent = `
    .certifications-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
    .certification-card{display:flex;flex-direction:column;gap:14px;padding:26px}
    .certification-level{color:var(--accent);font-size:.82rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
    .certification-card h3{color:var(--heading);font-size:1.35rem;line-height:1.3}
    .certification-meta{color:var(--muted);line-height:1.7}
    .certification-id{font-family:monospace;color:var(--text);font-size:.92rem}
    .certification-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto}
    .certification-actions a{padding:9px 13px;border-radius:999px;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.18);font-weight:700}
    .certification-card.primary{border-color:rgba(56,189,248,.35);box-shadow:0 14px 40px rgba(0,0,0,.3)}
    @media(max-width:760px){.certifications-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const section = document.createElement("section");
  section.id = "certifications";
  section.className = "section";
  section.innerHTML = `
    <div class="container">
      <div class="section-heading fade-up">
        <p class="section-label">Certifications</p>
        <h2>Professional credentials</h2>
      </div>
      <div class="certifications-grid">
        <article class="card certification-card primary fade-up">
          <p class="certification-level">Professional</p>
          <h3>SOLIDWORKS Design Professional (CSWP)</h3>
          <p class="certification-meta">Dassault Systèmes<br>Issued July 29, 2026</p>
          <p class="certification-id">Credential ID: C-CAXWBMJPDY</p>
          <div class="certification-actions">
            <a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-CAXWBMJPDY" target="_blank" rel="noopener noreferrer">Verify credential</a>
          </div>
        </article>
        <article class="card certification-card fade-up delay-1">
          <p class="certification-level">Associate</p>
          <h3>SOLIDWORKS Design Associate (CSWA)</h3>
          <p class="certification-meta">Dassault Systèmes<br>Issued May 16, 2026</p>
          <p class="certification-id">Credential ID: C-N3ZBHCXTP7</p>
          <div class="certification-actions">
            <a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-N3ZBHCXTP7" target="_blank" rel="noopener noreferrer">Verify credential</a>
          </div>
        </article>
      </div>
    </div>
  `;

  contactSection.parentNode.insertBefore(section, contactSection);

  if (nav && !nav.querySelector('a[href="#certifications"]')) {
    const link = document.createElement("a");
    link.href = "#certifications";
    link.textContent = "Certifications";
    const contactLink = nav.querySelector('a[href="#contact"]');
    nav.insertBefore(link, contactLink || null);
    link.addEventListener("click", () => nav.classList.remove("open"));
  }
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

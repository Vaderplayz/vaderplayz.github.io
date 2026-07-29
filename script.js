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
  },
  {
    card: document.querySelector("#projects .project-card:nth-child(3)"),
    url: "projects/soft-robotic-glove.html",
    label: "Open the hybrid soft muscle tendon rehabilitation glove project page"
  },
  {
    card: document.querySelector("#projects .project-card:nth-child(4)"),
    url: "projects/teleoperated-humanoid-hand.html",
    label: "Open the teleoperated humanoid robotic hand project page"
  },
  {
    card: document.querySelector("#projects .project-card:nth-child(5)"),
    url: "projects/double-attack-thrombectomy.html",
    label: "Open the double-attack mechanical thrombectomy project page"
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

// Use the approved thrombectomy figure as the current project thumbnail.
const thrombectomyCard = document.querySelector("#projects .project-card:nth-child(5)");
if (thrombectomyCard) {
  const thumbnail = thrombectomyCard.querySelector(".project-image");
  if (thumbnail) {
    thumbnail.src = "assets/projects/05-double-attack-thrombectomy/0.5 fig.png";
    thumbnail.alt = "Double-attack mechanical thrombectomy concept and prototype";
  }
}

// Mark Projects 3, 4, and 5 as ongoing research using only approved public media.
const ongoingResearchCards = [
  {
    card: document.querySelector("#projects .project-card:nth-child(3)"),
    description: "Ongoing co-first-author research on a rehabilitation glove combining compliant soft muscles with tendon-driven assistance. The current page uses only approved public media.",
    status: "Research status: Ongoing research; manuscript under review."
  },
  {
    card: document.querySelector("#projects .project-card:nth-child(4)"),
    description: "Ongoing first-author research integrating a tendon-driven humanoid hand, soft filament sensors, soft-muscle actuation, and MATLAB/Simulink control for real-time teleoperation. Only currently approved public media are shown.",
    status: "Research status: Ongoing research; manuscript under review."
  },
  {
    card: document.querySelector("#projects .project-card:nth-child(5)"),
    description: "Ongoing first-author research on a proof-of-concept thrombectomy device combining rotational clot interaction with soft-actuator-driven axial reciprocation. Preliminary benchtop testing showed approximately 7% localized suction improvement.",
    status: "Research status: Ongoing research; manuscript under review."
  }
];

ongoingResearchCards.forEach(({ card, description, status }) => {
  if (!card) return;

  const descriptionElement = card.querySelector(".project-content > p:not(.project-type)");
  if (descriptionElement) descriptionElement.textContent = description;

  const projectType = card.querySelector(".project-type");
  if (projectType) projectType.textContent = "Ongoing Research / Soft Robotics";

  const projectLinks = card.querySelector(".project-links");
  if (projectLinks) {
    projectLinks.querySelectorAll('a[href="#research"]').forEach(link => link.remove());

    let statusText = projectLinks.querySelector(".research-status-text");
    if (!statusText) {
      statusText = document.createElement("span");
      statusText.className = "research-status-text";
      projectLinks.appendChild(statusText);
    }
    statusText.textContent = status;
  }
});

// ===============================
// Certifications section
// ===============================
const contactSection = document.getElementById("contact");

if (contactSection && !document.getElementById("certifications")) {
  const style = document.createElement("style");
  style.textContent = `
    .certifications-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
    .certification-card{display:grid;grid-template-columns:150px minmax(0,1fr);gap:22px;align-items:center;padding:26px}
    .certification-logo-wrap{display:flex;align-items:center;justify-content:center;min-height:170px;padding:14px;border-radius:14px;background:#fff}
    .certification-logo{display:block;width:100%;height:145px;object-fit:contain}
    .certification-body{display:flex;flex-direction:column;gap:14px;min-width:0}
    .certification-level{color:var(--accent);font-size:.82rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
    .certification-card h3{color:var(--heading);font-size:1.35rem;line-height:1.3}
    .certification-meta{color:var(--muted);line-height:1.7}
    .certification-id{font-family:monospace;color:var(--text);font-size:.92rem;overflow-wrap:anywhere}
    .certification-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto}
    .certification-actions a{padding:9px 13px;border-radius:999px;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.18);font-weight:700}
    .certification-card.primary{border-color:rgba(56,189,248,.35);box-shadow:0 14px 40px rgba(0,0,0,.3)}
    .research-status-text{display:inline-block;color:var(--muted);font-weight:600;line-height:1.5}
    @media(max-width:950px){.certification-card{grid-template-columns:120px minmax(0,1fr)}.certification-logo{height:120px}.certification-logo-wrap{min-height:145px}}
    @media(max-width:760px){.certifications-grid{grid-template-columns:1fr}.certification-card{grid-template-columns:110px minmax(0,1fr)}}
    @media(max-width:520px){.certification-card{grid-template-columns:1fr}.certification-logo-wrap{min-height:150px}.certification-logo{height:130px}}
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
          <div class="certification-logo-wrap">
            <img class="certification-logo" src="assets/certifications/SOLIDWORKS DESIGN - PROFESSIONAL.png" alt="SOLIDWORKS Design Professional certification badge">
          </div>
          <div class="certification-body">
            <p class="certification-level">Professional</p>
            <h3>SOLIDWORKS Design Professional (CSWP)</h3>
            <p class="certification-meta">Dassault Systèmes<br>Issued July 29, 2026</p>
            <p class="certification-id">Credential ID: C-CAXWBMJPDY</p>
            <div class="certification-actions">
              <a href="assets/certifications/Certificate C-CAXWBMJPDY.pdf" target="_blank" rel="noopener noreferrer">View certificate</a>
              <a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-CAXWBMJPDY" target="_blank" rel="noopener noreferrer">Verify credential</a>
            </div>
          </div>
        </article>
        <article class="card certification-card fade-up delay-1">
          <div class="certification-logo-wrap">
            <img class="certification-logo" src="assets/certifications/SOLIDWORKS DESIGN - ASSOCIATE.png" alt="SOLIDWORKS Design Associate certification badge">
          </div>
          <div class="certification-body">
            <p class="certification-level">Associate</p>
            <h3>SOLIDWORKS Design Associate (CSWA)</h3>
            <p class="certification-meta">Dassault Systèmes<br>Issued May 16, 2026</p>
            <p class="certification-id">Credential ID: C-N3ZBHCXTP7</p>
            <div class="certification-actions">
              <a href="assets/certifications/Certificate C-N3ZBHCXTP7.pdf" target="_blank" rel="noopener noreferrer">View certificate</a>
              <a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-N3ZBHCXTP7" target="_blank" rel="noopener noreferrer">Verify credential</a>
            </div>
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

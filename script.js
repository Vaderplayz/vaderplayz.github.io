// ===============================
// Mobile menu toggle
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// ===============================
// Project detail navigation
// ===============================
const projectDetails = [
  [1, "projects/dual-lidar-uav.html", "Open the full Dual-2D-LiDAR UAV project page"],
  [2, "projects/teensy-quadcopter.html", "Open the full Teensy 4.1 quadcopter project page"],
  [3, "projects/soft-robotic-glove.html", "Open the hybrid soft muscle tendon rehabilitation glove project page"],
  [4, "projects/teleoperated-humanoid-hand.html", "Open the teleoperated humanoid robotic hand project page"],
  [5, "projects/double-attack-thrombectomy.html", "Open the double-attack mechanical thrombectomy project page"],
  [6, "projects/tool-interchange-arm.html", "Open the automatic tool-interchange robotic arm project page"],
  [7, "projects/automated-pen-refill-machine.html", "Open the automated whiteboard-pen refill machine project page"]
].map(([index, url, label]) => ({
  card: document.querySelector(`#projects .project-card:nth-child(${index})`),
  url,
  label
}));

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

  const openDetailPage = () => { window.location.href = url; };
  card.addEventListener("click", event => {
    if (!event.target.closest("a")) openDetailPage();
  });
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetailPage();
    }
  });
});

// ===============================
// Previous / next navigation on project pages
// ===============================
const projectPageOrder = [
  { file: "dual-lidar-uav.html", name: "Dual-LiDAR UAV" },
  { file: "teensy-quadcopter.html", name: "Teensy 4.1 Quadcopter" },
  { file: "soft-robotic-glove.html", name: "Soft Robotic Glove" },
  { file: "teleoperated-humanoid-hand.html", name: "Teleoperated Humanoid Hand" },
  { file: "double-attack-thrombectomy.html", name: "Mechanical Thrombectomy" },
  { file: "tool-interchange-arm.html", name: "Tool-Interchange Arm" },
  { file: "automated-pen-refill-machine.html", name: "Pen Refill Machine" }
];

const currentProjectFile = window.location.pathname.split("/").pop();
const currentProjectIndex = projectPageOrder.findIndex(project => project.file === currentProjectFile);
const existingBackLink = document.querySelector(".project-detail .back-link");

if (currentProjectIndex !== -1 && existingBackLink) {
  existingBackLink.href = "../projects.html";
  existingBackLink.textContent = "← Back to projects";

  const nextProject = projectPageOrder[(currentProjectIndex + 1) % projectPageOrder.length];
  const navRow = document.createElement("div");
  navRow.className = "project-page-nav";

  existingBackLink.parentNode.insertBefore(navRow, existingBackLink);
  navRow.appendChild(existingBackLink);

  const nextLink = document.createElement("a");
  nextLink.className = "next-project-link";
  nextLink.href = nextProject.file;
  nextLink.textContent = `Next project: ${nextProject.name} →`;
  navRow.appendChild(nextLink);

  const projectNavStyle = document.createElement("style");
  projectNavStyle.textContent = `
    .project-page-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:28px}
    .project-page-nav .back-link{margin-bottom:0}
    .next-project-link{display:inline-flex;color:var(--accent);font-weight:700;text-align:right}
    @media(max-width:640px){.project-page-nav{align-items:flex-start;flex-direction:column}.next-project-link{text-align:left}}
  `;
  document.head.appendChild(projectNavStyle);
}

// ===============================
// Homepage project media and text
// ===============================
function updateProjectCard(index, options) {
  const card = document.querySelector(`#projects .project-card:nth-child(${index})`);
  if (!card) return;

  if (options.image) {
    const image = card.querySelector(".project-image");
    if (image) {
      image.src = options.image;
      image.alt = options.alt || "Project thumbnail";
    }
  }

  if (options.description) {
    const description = card.querySelector(".project-content > p:not(.project-type)");
    if (description) description.textContent = options.description;
  }

  if (options.type) {
    const type = card.querySelector(".project-type");
    if (type) type.textContent = options.type;
  }

  if (options.status) {
    const links = card.querySelector(".project-links");
    if (links) {
      links.querySelectorAll('a[href="#research"]').forEach(link => link.remove());
      let status = links.querySelector(".research-status-text");
      if (!status) {
        status = document.createElement("span");
        status.className = "research-status-text";
        links.appendChild(status);
      }
      status.textContent = options.status;
    }
  }
}

updateProjectCard(3, {
  description: "Ongoing co-first-author research on a rehabilitation glove combining compliant soft muscles with tendon-driven assistance. The current page uses only approved public media.",
  type: "Ongoing Research / Soft Robotics",
  status: "Research status: Ongoing research; manuscript under review."
});

updateProjectCard(4, {
  description: "Ongoing first-author research integrating a tendon-driven humanoid hand, soft filament sensors, soft-muscle actuation, and MATLAB/Simulink control for real-time teleoperation. Only currently approved public media are shown.",
  type: "Ongoing Research / Soft Robotics",
  status: "Research status: Ongoing research; manuscript under review."
});

updateProjectCard(5, {
  image: "assets/projects/05-double-attack-thrombectomy/0.5 fig.png",
  alt: "Double-attack mechanical thrombectomy concept and prototype",
  description: "Ongoing first-author research on a proof-of-concept thrombectomy device combining rotational clot interaction with soft-actuator-driven axial reciprocation. Preliminary benchtop testing showed approximately 7% localized suction improvement.",
  type: "Ongoing Research / Soft Robotics",
  status: "Research status: Ongoing research; manuscript under review."
});

updateProjectCard(6, {
  image: "assets/projects/06-tool-interchange-arm/thumbnail.png",
  alt: "Automatic tool-interchange system for a humanoid robotic arm",
  description: "A group-led robotic tool-changing system inspired by CNC workflows, using electromagnetic coupling, guided alignment, servo sequencing, and integrated electrical contacts for autonomous end-effector exchange."
});

updateProjectCard(7, {
  image: "assets/projects/07-pen-refill-machine/thumbnail.jpg",
  alt: "Automated whiteboard-pen refill machine",
  description: "A complete mechatronic machine that automates whiteboard-pen handling and ink refilling through coordinated mechanical, electrical, and control subsystems."
});

// ===============================
// Personal note section on every project page
// ===============================
const projectDetail = document.querySelector(".project-detail .container");
if (projectDetail && !document.querySelector(".personal-project-note")) {
  const style = document.createElement("style");
  style.textContent = `
    .personal-project-note{margin-top:42px;padding:22px 24px;border:1px dashed rgba(56,189,248,.35);border-radius:16px;background:rgba(56,189,248,.06)}
    .personal-project-note h2{color:var(--heading);font-size:1.45rem;margin-bottom:8px}
    .personal-project-note p{color:var(--muted);line-height:1.7;margin:0}
    .research-status-text{display:inline-block;color:var(--muted);font-weight:600;line-height:1.5}
  `;
  document.head.appendChild(style);

  const note = document.createElement("section");
  note.className = "personal-project-note";
  note.innerHTML = `
    <h2>Personal Note</h2>
    <p>Add a few sentences here about what you learned, your contribution, or why this project matters to you.</p>
  `;
  projectDetail.appendChild(note);
}

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
      <div class="section-heading fade-up"><p class="section-label">Certifications</p><h2>Professional credentials</h2></div>
      <div class="certifications-grid">
        <article class="card certification-card primary fade-up">
          <div class="certification-logo-wrap"><img class="certification-logo" src="assets/certifications/SOLIDWORKS DESIGN - PROFESSIONAL.png" alt="SOLIDWORKS Design Professional certification badge"></div>
          <div class="certification-body"><p class="certification-level">Professional</p><h3>SOLIDWORKS Design Professional (CSWP)</h3><p class="certification-meta">Dassault Systèmes<br>Issued July 29, 2026</p><p class="certification-id">Credential ID: C-CAXWBMJPDY</p><div class="certification-actions"><a href="assets/certifications/Certificate C-CAXWBMJPDY.pdf" target="_blank" rel="noopener noreferrer">View certificate</a><a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-CAXWBMJPDY" target="_blank" rel="noopener noreferrer">Verify credential</a></div></div>
        </article>
        <article class="card certification-card fade-up delay-1">
          <div class="certification-logo-wrap"><img class="certification-logo" src="assets/certifications/SOLIDWORKS DESIGN - ASSOCIATE.png" alt="SOLIDWORKS Design Associate certification badge"></div>
          <div class="certification-body"><p class="certification-level">Associate</p><h3>SOLIDWORKS Design Associate (CSWA)</h3><p class="certification-meta">Dassault Systèmes<br>Issued May 16, 2026</p><p class="certification-id">Credential ID: C-N3ZBHCXTP7</p><div class="certification-actions"><a href="assets/certifications/Certificate C-N3ZBHCXTP7.pdf" target="_blank" rel="noopener noreferrer">View certificate</a><a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-N3ZBHCXTP7" target="_blank" rel="noopener noreferrer">Verify credential</a></div></div>
        </article>
      </div>
    </div>`;
  contactSection.parentNode.insertBefore(section, contactSection);

  if (nav && !nav.querySelector('a[href="#certifications"]')) {
    const link = document.createElement("a");
    link.href = "#certifications";
    link.textContent = "Certifications";
    nav.insertBefore(link, nav.querySelector('a[href="#contact"]') || null);
    link.addEventListener("click", () => nav.classList.remove("open"));
  }
}

// ===============================
// Reveal on scroll animation
// ===============================
const faders = document.querySelectorAll(".fade-up");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });
  faders.forEach(el => observer.observe(el));
} else {
  faders.forEach(el => el.classList.add("show"));
}

// ===============================
// Global portfolio setup
// ===============================
const LINKEDIN_URL = "https://www.linkedin.com/in/le-hai-trung-112081298/";
const SITE_URL = "https://vaderplayz.github.io/";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap";
document.head.appendChild(fontLink);

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/svg+xml";
favicon.href = window.location.pathname.includes("/projects/") || window.location.pathname.includes("/experience/")
  ? "../assets/General/robot-favicon.svg"
  : "assets/General/robot-favicon.svg";
document.head.appendChild(favicon);

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  body,button,input,textarea,select{font-family:"Manrope",sans-serif!important}
  h1,h2,h3,h4,h5,h6,.logo,.section-label,.project-type,.eyebrow,.timeline-stamp,.certification-level{font-family:"Space Grotesk",sans-serif!important}
  h1,h2,h3{letter-spacing:-.025em}.hero h1,.page-hero h1,.project-detail h1,.experience-detail h1{letter-spacing:-.045em}.logo{letter-spacing:-.04em}
  .btn,.small-btn,.detail-links a,.document-links a,.certification-actions a,.lab-button,.experience-detail-link,.next-project-link,.back-link{
    background:linear-gradient(135deg,#38bdf8,#2563eb)!important;color:#fff!important;border:0!important;box-shadow:0 10px 30px rgba(37,99,235,.22);border-radius:12px;padding:11px 16px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-weight:700
  }
  .btn:hover,.small-btn:hover,.detail-links a:hover,.document-links a:hover,.certification-actions a:hover,.lab-button:hover,.experience-detail-link:hover,.next-project-link:hover,.back-link:hover{transform:translateY(-2px);filter:brightness(1.06)}
  .linkedin-inline{display:inline-flex;align-items:center;gap:8px;color:var(--accent);font-weight:700}
  .opportunity-note{margin:18px 0 0;color:#dbeafe;font-weight:650;max-width:760px}
  .achievements-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.achievement-card{padding:24px}.achievement-card h3{margin-bottom:10px}.achievement-meta{color:var(--accent);font-weight:700;margin-bottom:9px}.achievement-card p{color:var(--muted)}
  .personal-project-note{margin-top:42px;padding:22px 24px;border:1px dashed rgba(56,189,248,.35);border-radius:16px;background:rgba(56,189,248,.06)}.personal-project-note h2{color:var(--heading);font-size:1.45rem;margin-bottom:8px}.personal-project-note p{color:var(--muted);line-height:1.7;margin:0}
  .project-page-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:28px}.project-page-nav .back-link{margin-bottom:0}
  .site-footer .footer-content{gap:16px;flex-wrap:wrap}.footer-linkedin{font-weight:700;color:#dbeafe}
  :focus-visible{outline:3px solid rgba(56,189,248,.75);outline-offset:3px;border-radius:6px}
  @media(max-width:760px){.achievements-grid{grid-template-columns:1fr}.project-page-nav{align-items:flex-start;flex-direction:column}}
`;
document.head.appendChild(globalStyle);

function ensureMeta(property, content, useName = false) {
  const selector = useName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(useName ? "name" : "property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

const pageTitle = document.title || "Le Hai Trung | Robotics & Mechatronics Portfolio";
const existingDescription = document.querySelector('meta[name="description"]')?.content;
const pageDescription = existingDescription || "Robotics, autonomous systems, soft robotics, UAV, sensing, control, and mechatronic engineering work by Le Hai Trung.";
const isNested = window.location.pathname.includes("/projects/") || window.location.pathname.includes("/experience/");
const previewImage = new URL(isNested ? "../assets/General/portrait.jpg" : "assets/General/portrait.jpg", window.location.href).href;
ensureMeta("description", pageDescription, true);
ensureMeta("og:title", pageTitle);
ensureMeta("og:description", pageDescription);
ensureMeta("og:type", "website");
ensureMeta("og:url", window.location.href);
ensureMeta("og:image", previewImage);
ensureMeta("twitter:card", "summary_large_image", true);
ensureMeta("twitter:title", pageTitle, true);
ensureMeta("twitter:description", pageDescription, true);
ensureMeta("twitter:image", previewImage, true);

if (!document.getElementById("portfolio-person-schema")) {
  const schema = document.createElement("script");
  schema.id = "portfolio-person-schema";
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Le Hai Trung",
    url: SITE_URL,
    email: "mailto:23trung.lh@vinuni.edu.vn",
    affiliation: {"@type":"CollegeOrUniversity","name":"VinUniversity"},
    sameAs: [LINKEDIN_URL, "https://github.com/Vaderplayz", "https://bioroboticslaboratory.com/"],
    knowsAbout: ["Robotics", "Mechatronics", "Autonomous Systems", "Soft Robotics", "UAVs", "Control Systems"]
  });
  document.head.appendChild(schema);
}

document.querySelectorAll("img:not([loading])").forEach((img, index) => { if (index > 1) img.loading = "lazy"; });
document.querySelectorAll("video").forEach(video => { video.preload = "metadata"; });

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
}

const profileInfo = document.querySelector(".profile-info ul");
if (profileInfo && !profileInfo.querySelector('a[href*="linkedin.com"]')) {
  const li = document.createElement("li");
  li.innerHTML = `<a class="linkedin-inline" href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer">LinkedIn profile</a>`;
  profileInfo.appendChild(li);
}

const contactLinks = document.querySelector(".contact-links");
if (contactLinks && !contactLinks.querySelector('a[href*="linkedin.com"]')) {
  const link = document.createElement("a");
  link.href = LINKEDIN_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "LinkedIn";
  contactLinks.insertBefore(link, contactLinks.children[1] || null);
}

const heroDescription = document.querySelector(".hero-description");
if (heroDescription && !document.querySelector(".opportunity-note")) {
  const note = document.createElement("p");
  note.className = "opportunity-note";
  note.textContent = "Currently seeking graduate study and engineering opportunities in robotics, autonomous systems, and mechatronic design.";
  heroDescription.insertAdjacentElement("afterend", note);
}

const highlightsSection = document.getElementById("highlights");
if (highlightsSection && !document.getElementById("achievements")) {
  const achievements = document.createElement("section");
  achievements.id = "achievements";
  achievements.className = "section";
  achievements.innerHTML = `
    <div class="container">
      <div class="section-heading fade-up"><p class="section-label">Achievements</p><h2>Research, admission, and recognition</h2></div>
      <div class="achievements-grid">
        <article class="card achievement-card fade-up"><p class="achievement-meta">Journal manuscript · Under review</p><h3>A Hybrid Tendon-Hydraulic Soft Robotic Glove for Post-Stroke Hand Rehabilitation with Bidirectional Finger Assistance</h3><p>Submitted to <em>Sensors and Actuators A: Physical</em>.</p></article>
        <article class="card achievement-card fade-up delay-1"><p class="achievement-meta">Journal manuscript · Submitted 4 July 2026</p><h3>Integrating Servo-Controlled Soft Muscle Actuators with Tendon-Driven Mechanisms for a Teleoperated Humanoid Robotic Hand using Soft Filament Sensor</h3><p>Submitted to the <em>Journal of Intelligent & Robotic Systems</em>.</p></article>
        <article class="card achievement-card fade-up"><p class="achievement-meta">Conference paper · ICARCV 2026</p><h3>Double-Attack Thrombectomy: A Soft-Robotic Milli-Spinner Catheter Concept for Suction-Assisted Clot-Debris Capture</h3><p>Submitted to the 2026 19th International Conference on Control, Automation, Robotics and Vision.</p></article>
        <article class="card achievement-card fade-up delay-1"><p class="achievement-meta">Academic recognition</p><h3>Dean’s List · Spring 2025</h3><p>Recognized for academic performance at VinUniversity.</p></article>
        <article class="card achievement-card fade-up"><p class="achievement-meta">Graduate admission</p><h3>University of Pennsylvania · Robotics</h3><p>Admitted to the University of Pennsylvania Master’s program in Robotics.</p></article>
      </div>
    </div>`;
  highlightsSection.insertAdjacentElement("afterend", achievements);
}

const footerContent = document.querySelector(".site-footer .footer-content");
if (footerContent && !footerContent.querySelector(".footer-linkedin")) {
  const footerLinkedIn = document.createElement("a");
  footerLinkedIn.className = "footer-linkedin";
  footerLinkedIn.href = LINKEDIN_URL;
  footerLinkedIn.target = "_blank";
  footerLinkedIn.rel = "noopener noreferrer";
  footerLinkedIn.textContent = "LinkedIn";
  footerContent.appendChild(footerLinkedIn);
}

const projectDetails = [
  [1,"projects/dual-lidar-uav.html","Open the Dual-LiDAR UAV project"],
  [2,"projects/teensy-quadcopter.html","Open the custom quadcopter project"],
  [3,"projects/soft-robotic-glove.html","Open the soft robotic glove project"],
  [4,"projects/teleoperated-humanoid-hand.html","Open the teleoperated humanoid hand project"],
  [5,"projects/double-attack-thrombectomy.html","Open the thrombectomy project"],
  [6,"projects/tool-interchange-arm.html","Open the tool-interchange project"],
  [7,"projects/automated-pen-refill-machine.html","Open the pen-refill project"],
  [8,"projects/gesture-controlled-survey-robot.html","Open the gesture survey robot project"],
  [9,"projects/minihawk-vtol.html","Open the MiniHawk VTOL project"],
  [10,"projects/water-quality-monitoring.html","Open the water-quality monitoring project"]
];
projectDetails.forEach(([index,url,label]) => {
  const card = document.querySelector(`#projects .project-card:nth-child(${index})`);
  if (!card) return;
  card.setAttribute("role","link"); card.setAttribute("tabindex","0"); card.setAttribute("aria-label",label); card.style.cursor="pointer";
  const open = () => { window.location.href = url; };
  card.addEventListener("click", e => { if (!e.target.closest("a")) open(); });
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
});

const projectPageOrder = [
  ["dual-lidar-uav.html","Dual-LiDAR UAV"],["teensy-quadcopter.html","Teensy 4.1 Quadcopter"],["soft-robotic-glove.html","Soft Robotic Glove"],["teleoperated-humanoid-hand.html","Teleoperated Humanoid Hand"],["double-attack-thrombectomy.html","Mechanical Thrombectomy"],["tool-interchange-arm.html","Tool-Interchange Arm"],["automated-pen-refill-machine.html","Pen Refill Machine"],["gesture-controlled-survey-robot.html","Gesture-Controlled Survey Robot"],["minihawk-vtol.html","MiniHawk VTOL"],["water-quality-monitoring.html","Water-Quality Monitoring System"]
];
const currentProjectFile = window.location.pathname.split("/").pop();
const currentProjectIndex = projectPageOrder.findIndex(([file]) => file === currentProjectFile);
const existingBackLink = document.querySelector(".project-detail .back-link");
if (currentProjectIndex !== -1 && existingBackLink) {
  existingBackLink.href = "../projects.html"; existingBackLink.textContent = "← Back to projects";
  const nextProject = projectPageOrder[(currentProjectIndex + 1) % projectPageOrder.length];
  const navRow = document.createElement("div"); navRow.className = "project-page-nav";
  existingBackLink.parentNode.insertBefore(navRow, existingBackLink); navRow.appendChild(existingBackLink);
  const nextLink = document.createElement("a"); nextLink.className = "next-project-link"; nextLink.href = nextProject[0]; nextLink.textContent = `Next project: ${nextProject[1]} →`; navRow.appendChild(nextLink);
}

const projectDetail = document.querySelector(".project-detail .container");
if (projectDetail && !document.querySelector(".personal-project-note")) {
  const note = document.createElement("section");
  note.className = "personal-project-note";
  note.innerHTML = `<h2>My Contribution and Personal Note</h2><p>This section will be completed with my specific role, technical decisions, lessons learned, and the parts of the system I personally designed, implemented, or tested.</p>`;
  projectDetail.appendChild(note);
}

const contactSection = document.getElementById("contact");
if (contactSection && !document.getElementById("certifications")) {
  const section = document.createElement("section"); section.id = "certifications"; section.className = "section";
  section.innerHTML = `<div class="container"><div class="section-heading fade-up"><p class="section-label">Certifications</p><h2>Professional credentials</h2></div><div class="certifications-grid"><article class="card certification-card primary fade-up"><div class="certification-logo-wrap"><img class="certification-logo" loading="lazy" src="assets/certifications/SOLIDWORKS DESIGN - PROFESSIONAL.png" alt="SOLIDWORKS Design Professional certification badge"></div><div class="certification-body"><p class="certification-level">Professional</p><h3>SOLIDWORKS Design Professional (CSWP)</h3><p class="certification-meta">Dassault Systèmes<br>Issued July 29, 2026</p><p class="certification-id">Credential ID: C-CAXWBMJPDY</p><div class="certification-actions"><a href="assets/certifications/Certificate C-CAXWBMJPDY.pdf" target="_blank" rel="noopener noreferrer">View certificate</a><a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-CAXWBMJPDY" target="_blank" rel="noopener noreferrer">Verify credential</a></div></div></article><article class="card certification-card fade-up delay-1"><div class="certification-logo-wrap"><img class="certification-logo" loading="lazy" src="assets/certifications/SOLIDWORKS DESIGN - ASSOCIATE.png" alt="SOLIDWORKS Design Associate certification badge"></div><div class="certification-body"><p class="certification-level">Associate</p><h3>SOLIDWORKS Design Associate (CSWA)</h3><p class="certification-meta">Dassault Systèmes<br>Issued May 16, 2026</p><p class="certification-id">Credential ID: C-N3ZBHCXTP7</p><div class="certification-actions"><a href="assets/certifications/Certificate C-N3ZBHCXTP7.pdf" target="_blank" rel="noopener noreferrer">View certificate</a><a href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-N3ZBHCXTP7" target="_blank" rel="noopener noreferrer">Verify credential</a></div></div></article></div></div>`;
  contactSection.parentNode.insertBefore(section, contactSection);
}

const faders = document.querySelectorAll(".fade-up");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("show"); }), {threshold:.15});
  faders.forEach(el => observer.observe(el));
} else { faders.forEach(el => el.classList.add("show")); }

// Bilingual site language switcher. Version query prevents browsers from reusing an older partial translation file.
const i18nScript = document.createElement("script");
i18nScript.src = (isNested ? "../i18n.js" : "i18n.js") + "?v=20260801-complete-1";
i18nScript.defer = true;
document.body.appendChild(i18nScript);

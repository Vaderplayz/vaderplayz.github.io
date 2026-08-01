(() => {
  const STORAGE_KEY = "portfolio-language";
  const DEFAULT_LANGUAGE = "en";

  const vi = {
    "About": "Giới thiệu",
    "Projects": "Dự án",
    "Experience": "Kinh nghiệm",
    "Research": "Nghiên cứu",
    "Certifications": "Chứng chỉ",
    "Contact": "Liên hệ",
    "View Projects": "Xem dự án",
    "View all projects": "Xem tất cả dự án",
    "Download Resume": "Tải CV",
    "View Resume / CV": "Xem CV",
    "CV": "CV",
    "GitHub": "GitHub",
    "LinkedIn profile": "Hồ sơ LinkedIn",
    "LinkedIn": "LinkedIn",
    "About me": "Về tôi",
    "Final-year Mechanical Engineering undergraduate": "Sinh viên năm cuối ngành Kỹ thuật Cơ khí",
    "VinUniversity 2023–2027": "VinUniversity 2023–2027",
    "VinUni Biorobotics Lab": "Phòng thí nghiệm Biorobotics VinUni",
    "Technical profile": "Hồ sơ chuyên môn",
    "Field of Interest": "Lĩnh vực quan tâm",
    "Skills": "Kỹ năng",
    "Highlights": "Điểm nổi bật",
    "Project": "Dự án",
    "Internship": "Thực tập",
    "Achievements": "Thành tích",
    "Research, admission, and recognition": "Nghiên cứu, tuyển sinh và ghi nhận",
    "Research and Engineering": "Nghiên cứu và Kỹ thuật",
    "Academic": "Học thuật",
    "Industry": "Công nghiệp",
    "Let’s connect": "Kết nối với tôi",
    "Let's connect": "Kết nối với tôi",
    "Currently seeking graduate study and engineering opportunities in robotics, autonomous systems, and mechatronic design.": "Hiện đang tìm kiếm cơ hội học sau đại học và vị trí kỹ thuật trong lĩnh vực robot, hệ thống tự hành và thiết kế cơ điện tử.",
    "I am a final-year Mechanical Engineering undergraduate focused on robotics and mechatronics. I build systems that combine sensing, actuation, control, and real-world deployment across soft robotics, humanoid-hand teleoperation, autonomous UAVs, and LiDAR-based mapping.": "Tôi là sinh viên năm cuối ngành Kỹ thuật Cơ khí, tập trung vào robot và cơ điện tử. Tôi phát triển các hệ thống kết hợp cảm biến, cơ cấu chấp hành, điều khiển và triển khai thực tế trong robot mềm, điều khiển từ xa bàn tay robot hình người, UAV tự hành và lập bản đồ bằng LiDAR.",
    "I am especially interested in robotics and mechatronics, soft robotics, UAV autonomy, robot perception, mapping and navigation, and control systems. My work is driven by building practical robotic systems that connect sensing, actuation, control, and real-world deployment.": "Tôi đặc biệt quan tâm đến robot và cơ điện tử, robot mềm, UAV tự hành, nhận thức robot, lập bản đồ và dẫn đường, cùng các hệ thống điều khiển. Công việc của tôi hướng đến việc xây dựng các hệ thống robot thực tiễn kết nối cảm biến, cơ cấu chấp hành, điều khiển và triển khai trong môi trường thật.",
    "I am open to research collaboration, graduate-study opportunities, and conversations about robotics, autonomous systems, soft robotics, and mechatronic design.": "Tôi sẵn sàng trao đổi về hợp tác nghiên cứu, cơ hội học sau đại học, robot, hệ thống tự hành, robot mềm và thiết kế cơ điện tử.",
    "Developing research prototypes involving soft-muscle actuation, tendon mechanisms, soft sensing, teleoperation, experimental validation, and technical writing.": "Phát triển các nguyên mẫu nghiên cứu liên quan đến cơ mềm, cơ cấu gân, cảm biến mềm, điều khiển từ xa, đánh giá thực nghiệm và viết bài kỹ thuật.",
    "Contributed to rehabilitation robotics, soft mechanisms, actuator fabrication, experimental setup development, and technical communication.": "Tham gia phát triển robot phục hồi chức năng, cơ cấu mềm, chế tạo cơ cấu chấp hành, xây dựng hệ thí nghiệm và truyền đạt kỹ thuật.",
    "UAV integration, PX4 offboard control, and flight testing": "Tích hợp UAV, điều khiển PX4 offboard và thử nghiệm bay",
    "Soft robotics and human-centered robotic systems": "Robot mềm và hệ thống robot lấy con người làm trung tâm",
    "Prototyping, fabrication, and experimentation": "Tạo mẫu, chế tạo và thực nghiệm",
    "Research Assistant at VinUni Biorobotics Lab": "Trợ lý Nghiên cứu tại Phòng thí nghiệm Biorobotics VinUni",
    "Undergraduate Researcher at VinUni Biorobotics Lab": "Nghiên cứu viên Đại học tại Phòng thí nghiệm Biorobotics VinUni",
    "UAV Engineering Intern at Phenikaa-X": "Thực tập sinh Kỹ thuật UAV tại Phenikaa-X",
    "Designed a battery-holder retrofit for a Holybro X500 platform, implemented PX4 offboard velocity control for GPS-denied flight, supported AprilTag-based localization and camera deployment, and participated in real-world testing as a test pilot.": "Thiết kế bộ gá pin cải tiến cho nền tảng Holybro X500, triển khai điều khiển vận tốc PX4 offboard cho bay không GPS, hỗ trợ định vị bằng AprilTag và tích hợp camera, đồng thời tham gia thử nghiệm thực tế với vai trò phi công thử nghiệm.",
    "View internship details →": "Xem chi tiết kỳ thực tập →",
    "Journal manuscript · Under review": "Bài báo tạp chí · Đang phản biện",
    "Journal manuscript · Submitted 4 July 2026": "Bài báo tạp chí · Nộp ngày 4 tháng 7 năm 2026",
    "Conference paper · ICARCV 2026": "Bài báo hội nghị · ICARCV 2026",
    "Academic recognition": "Ghi nhận học thuật",
    "Graduate admission": "Trúng tuyển cao học",
    "Submitted to Sensors and Actuators A: Physical.": "Đã nộp tới tạp chí Sensors and Actuators A: Physical.",
    "Submitted to the Journal of Intelligent & Robotic Systems.": "Đã nộp tới Journal of Intelligent & Robotic Systems.",
    "Submitted to the 2026 19th International Conference on Control, Automation, Robotics and Vision.": "Đã nộp tới Hội nghị Quốc tế lần thứ 19 về Điều khiển, Tự động hóa, Robot và Thị giác năm 2026.",
    "Dean’s List · Spring 2025": "Danh sách Dean · Học kỳ Xuân 2025",
    "Recognized for academic performance at VinUniversity.": "Được VinUniversity ghi nhận thành tích học tập.",
    "University of Pennsylvania · Robotics": "Đại học Pennsylvania · Robotics",
    "Admitted to the University of Pennsylvania Master’s program in Robotics.": "Được nhận vào chương trình Thạc sĩ Robotics của Đại học Pennsylvania.",
    "Professional credentials": "Chứng chỉ chuyên môn",
    "Professional": "Chuyên nghiệp",
    "Associate": "Cơ bản",
    "Issued July 29, 2026": "Cấp ngày 29 tháng 7 năm 2026",
    "Issued May 16, 2026": "Cấp ngày 16 tháng 5 năm 2026",
    "Credential ID:": "Mã chứng chỉ:",
    "View certificate": "Xem chứng chỉ",
    "Verify credential": "Xác minh chứng chỉ",
    "Robotics and engineering projects": "Các dự án robot và kỹ thuật",
    "Detailed project pages, current media, research status, and technical documentation. Gallery-only content is hidden for now to keep the portfolio focused.": "Các trang dự án chi tiết, hình ảnh và video hiện có, trạng thái nghiên cứu và tài liệu kỹ thuật. Nội dung chỉ mang tính thư viện ảnh tạm thời được ẩn để giữ trọng tâm cho hồ sơ.",
    "UAV / Robotics": "UAV / Robot",
    "Independent Project / UAV": "Dự án cá nhân / UAV",
    "Research / Soft Robotics": "Nghiên cứu / Robot mềm",
    "Research / Humanoid Robotics": "Nghiên cứu / Robot hình người",
    "Ongoing Research / Soft Robotics": "Nghiên cứu đang thực hiện / Robot mềm",
    "Intelligent Physical System": "Hệ thống Vật lý Thông minh",
    "Robotics and Automation": "Robot và Tự động hóa",
    "Mechanical Synthesis": "Tổng hợp Cơ khí",
    "Mechatronics": "Cơ điện tử",
    "Introduction to CECS": "Nhập môn CECS",
    "Custom Quadcopter Using Teensy 4.1 and MPU6050": "Quadcopter tùy chỉnh sử dụng Teensy 4.1 và MPU6050",
    "Hybrid Soft Muscle–Tendon Rehabilitation Glove": "Găng tay phục hồi chức năng kết hợp cơ mềm và gân",
    "Teleoperated Humanoid Robotic Hand with Soft Filament Sensor": "Bàn tay robot hình người điều khiển từ xa sử dụng cảm biến sợi mềm",
    "Double-Attack Mechanical Thrombectomy": "Thiết bị lấy huyết khối cơ học tác động kép",
    "Automatic Tool-Interchange System for a Humanoid Robotic Arm": "Hệ thống tự động thay đổi dụng cụ cho cánh tay robot hình người",
    "Automated Whiteboard-Pen Refill Machine": "Máy tự động nạp lại mực bút bảng trắng",
    "Hand-Gesture-Controlled Robot for Environmental Surveying": "Robot khảo sát môi trường điều khiển bằng cử chỉ tay",
    "MiniHawk VTOL Tilt-Rotor Tricopter": "MiniHawk VTOL ba cánh quạt nghiêng",
    "Wireless Water-Quality Monitoring and Mapping System": "Hệ thống giám sát và lập bản đồ chất lượng nước không dây",
    "A custom PX4 UAV combining horizontal and vertical 2D LiDAR sensing, indoor SLAM, sequential 3D reconstruction, Raspberry Pi processing, and AprilTag precision landing.": "Một UAV PX4 tùy chỉnh kết hợp LiDAR 2D theo phương ngang và dọc, SLAM trong nhà, tái tạo 3D tuần tự, xử lý bằng Raspberry Pi và hạ cánh chính xác với AprilTag.",
    "A scratch-built quadcopter developed through mechanical redesign, constrained testing, vibration troubleshooting, ANSYS validation, and PID tuning.": "Một quadcopter được phát triển từ đầu thông qua thiết kế lại cơ khí, thử nghiệm có ràng buộc, xử lý rung, xác nhận bằng ANSYS và tinh chỉnh PID.",
    "Co-first-author research on a wearable rehabilitation glove combining compliant soft muscles with tendon-driven assistance.": "Nghiên cứu đồng tác giả thứ nhất về găng tay phục hồi chức năng đeo được, kết hợp cơ mềm có tính tuân thủ với hỗ trợ truyền động bằng gân.",
    "First-author work integrating a tendon-driven hand, soft sensors, soft-muscle actuators, and MATLAB/Simulink control.": "Nghiên cứu tác giả thứ nhất tích hợp bàn tay truyền động bằng gân, cảm biến mềm, cơ cấu chấp hành cơ mềm và điều khiển MATLAB/Simulink.",
    "First-author proof-of-concept device combining rotational clot interaction with soft-actuator-driven axial reciprocation.": "Thiết bị kiểm chứng ý tưởng do tác giả thứ nhất thực hiện, kết hợp tương tác xoay với huyết khối và chuyển động tịnh tiến dọc trục nhờ cơ cấu chấp hành mềm.",
    "A group-led robotic tool-changing system using guided alignment, electromagnetic coupling, servo sequencing, and integrated electrical contacts.": "Hệ thống thay dụng cụ robot do nhóm phát triển, sử dụng căn chỉnh dẫn hướng, ghép nối điện từ, trình tự servo và tiếp điểm điện tích hợp.",
    "An automated mechanism for opening, refilling, and restoring reusable whiteboard markers using coordinated electromechanical subsystems.": "Một cơ cấu tự động mở, nạp mực và hoàn thiện lại bút bảng trắng tái sử dụng bằng các phân hệ cơ điện phối hợp.",
    "A differential-drive robot controlled by wearable IMUs, with a head-tracked camera gimbal and onboard environmental sensing.": "Robot dẫn động vi sai được điều khiển bằng IMU đeo tay, tích hợp gimbal camera theo dõi chuyển động đầu và cảm biến môi trường trên xe.",
    "A hands-on build based on Stephen Carlson’s open-source MiniHawk VTOL, covering 3D-printed fabrication, tilt-nacelle alignment, aircraft integration, configuration, and flight testing.": "Một dự án chế tạo thực tế dựa trên thiết kế MiniHawk VTOL mã nguồn mở của Stephen Carlson, bao gồm in 3D, căn chỉnh cụm động cơ nghiêng, tích hợp máy bay, cấu hình và thử nghiệm bay.",
    "A connected sensing platform for pH, TDS, turbidity, and temperature measurements with Wi-Fi data logging, live graphs, and location-based water-quality mapping.": "Một nền tảng cảm biến kết nối đo pH, TDS, độ đục và nhiệt độ, hỗ trợ ghi dữ liệu qua Wi-Fi, biểu đồ trực tiếp và lập bản đồ chất lượng nước theo vị trí.",
    "Manuscripts and ongoing work": "Bài báo và nghiên cứu đang thực hiện",
    "Current publication status and public-release notes for ongoing soft-robotics and robotic-system research.": "Trạng thái công bố hiện tại và ghi chú phát hành công khai cho các nghiên cứu robot mềm và hệ thống robot đang thực hiện.",
    "Selected Research Projects": "Các dự án nghiên cứu tiêu biểu",
    "Public release status": "Trạng thái công bố công khai",
    "Some research media, figures, and manuscript files are intentionally not public yet. Approved photos, videos, posters, and paper links will be added after publication or permission.": "Một số hình ảnh, hình minh họa và bản thảo nghiên cứu hiện chưa được công khai. Ảnh, video, poster và liên kết bài báo được phê duyệt sẽ được bổ sung sau khi công bố hoặc có sự cho phép.",
    "First author; manuscript under review.": "Tác giả thứ nhất; bản thảo đang được phản biện.",
    "Co-first author; manuscript under review.": "Đồng tác giả thứ nhất; bản thảo đang được phản biện.",
    "First author; ongoing research and manuscript under review.": "Tác giả thứ nhất; nghiên cứu đang tiếp tục và bản thảo đang được phản biện.",
    "Overview": "Tổng quan",
    "System Overview": "Tổng quan hệ thống",
    "Project Overview": "Tổng quan dự án",
    "Design and Development": "Thiết kế và phát triển",
    "System Architecture": "Kiến trúc hệ thống",
    "Mechanical Design": "Thiết kế cơ khí",
    "Electronics and Control": "Điện tử và điều khiển",
    "Experimental Setup": "Thiết lập thí nghiệm",
    "Results": "Kết quả",
    "Testing and Results": "Thử nghiệm và kết quả",
    "Simulation": "Mô phỏng",
    "Real-World Deployment": "Triển khai thực tế",
    "Development Process": "Quá trình phát triển",
    "Hardware Development": "Phát triển phần cứng",
    "Software and Control": "Phần mềm và điều khiển",
    "Flight Testing": "Thử nghiệm bay",
    "Demonstration Videos": "Video trình diễn",
    "Videos": "Video",
    "Gallery": "Thư viện",
    "Documents": "Tài liệu",
    "Project Documents": "Tài liệu dự án",
    "Technical Details": "Chi tiết kỹ thuật",
    "Key Features": "Đặc điểm chính",
    "My Contribution and Personal Note": "Đóng góp cá nhân và ghi chú",
    "This section will be completed with my specific role, technical decisions, lessons learned, and the parts of the system I personally designed, implemented, or tested.": "Phần này sẽ được hoàn thiện với vai trò cụ thể, các quyết định kỹ thuật, bài học kinh nghiệm và những phần hệ thống mà tôi trực tiếp thiết kế, triển khai hoặc thử nghiệm.",
    "← Back to projects": "← Quay lại danh sách dự án",
    "Back to projects": "Quay lại danh sách dự án",
    "Next project:": "Dự án tiếp theo:",
    "Original Project": "Dự án gốc",
    "Original GitHub Repository": "Kho GitHub gốc",
    "Hackaday Project Page": "Trang dự án Hackaday",
    "Source and Attribution": "Nguồn và ghi nhận",
    "Built with HTML, CSS, and GitHub Pages.": "Được xây dựng bằng HTML, CSS và GitHub Pages.",
    "© 2026 Le Hai Trung. Built with HTML, CSS, and GitHub Pages.": "© 2026 Le Hai Trung. Được xây dựng bằng HTML, CSS và GitHub Pages."
  };

  const phraseRules = [
    [/^Next project:\s*/i, "Dự án tiếp theo: "],
    [/^Open the /i, "Mở dự án "],
    [/^Research status:\s*/i, "Trạng thái nghiên cứu: "],
    [/^Team of (\d+)/i, "Nhóm $1 người"],
    [/^Team project/i, "Dự án nhóm"],
    [/^Individual project/i, "Dự án cá nhân"],
    [/^Ongoing research/i, "Nghiên cứu đang thực hiện"],
    [/^Under review/i, "Đang phản biện"],
    [/^Completed/i, "Đã hoàn thành"],
    [/^Spring /i, "Học kỳ Xuân "],
    [/^Fall /i, "Học kỳ Thu "]
  ];

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  function translateValue(value) {
    const trimmed = value.trim();
    if (!trimmed) return value;
    let translated = vi[trimmed];
    if (!translated) {
      translated = trimmed;
      phraseRules.forEach(([rule, replacement]) => {
        translated = translated.replace(rule, replacement);
      });
      if (translated === trimmed) return value;
    }
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function collectTextNodes(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function applyLanguage(language) {
    document.documentElement.lang = language === "vi" ? "vi" : "en";
    collectTextNodes().forEach(node => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      node.nodeValue = language === "vi" ? translateValue(source) : source;
    });

    document.querySelectorAll("[alt],[title],[aria-label],[placeholder]").forEach(element => {
      if (!originalAttributes.has(element)) originalAttributes.set(element, {});
      const stored = originalAttributes.get(element);
      ["alt", "title", "aria-label", "placeholder"].forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        if (!(attribute in stored)) stored[attribute] = element.getAttribute(attribute);
        const source = stored[attribute];
        element.setAttribute(attribute, language === "vi" ? translateValue(source) : source);
      });
    });

    if (language === "vi") {
      document.title = document.title
        .replace("Projects", "Dự án")
        .replace("Research", "Nghiên cứu")
        .replace("Portfolio", "Hồ sơ năng lực")
        .replace("Experience", "Kinh nghiệm");
    } else if (document.documentElement.dataset.originalTitle) {
      document.title = document.documentElement.dataset.originalTitle;
    }

    const toggle = document.getElementById("language-toggle");
    if (toggle) {
      toggle.textContent = language === "vi" ? "EN" : "VI";
      toggle.setAttribute("aria-label", language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt");
      toggle.title = language === "vi" ? "English" : "Tiếng Việt";
    }
  }

  document.documentElement.dataset.originalTitle = document.title;

  const languageToggle = document.createElement("button");
  languageToggle.id = "language-toggle";
  languageToggle.className = "language-toggle";
  languageToggle.type = "button";

  const toggleStyle = document.createElement("style");
  toggleStyle.textContent = `
    .language-toggle{display:inline-flex;align-items:center;justify-content:center;min-width:46px;height:38px;padding:0 12px;border-radius:999px;border:1px solid rgba(56,189,248,.32);background:rgba(56,189,248,.1);color:#e0f2fe;font-family:"Space Grotesk",sans-serif;font-size:.84rem;font-weight:800;letter-spacing:.06em;cursor:pointer;transition:.25s ease}
    .language-toggle:hover{background:linear-gradient(135deg,#38bdf8,#2563eb);border-color:transparent;color:#fff;transform:translateY(-1px)}
    .nav .language-toggle{margin-left:2px}
    @media(max-width:760px){.nav .language-toggle{width:100%;margin:8px 0 0;justify-content:flex-start;padding-left:0;background:transparent;border:0;color:var(--accent)}}
  `;
  document.head.appendChild(toggleStyle);

  const nav = document.getElementById("nav");
  if (nav) nav.appendChild(languageToggle);
  else document.body.prepend(languageToggle);

  let language = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  if (!['en', 'vi'].includes(language)) language = DEFAULT_LANGUAGE;
  applyLanguage(language);

  languageToggle.addEventListener("click", () => {
    language = document.documentElement.lang === "vi" ? "en" : "vi";
    localStorage.setItem(STORAGE_KEY, language);
    applyLanguage(language);
  });
})();

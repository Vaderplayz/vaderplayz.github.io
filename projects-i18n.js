(() => {
  const cards = [
    {
      title: "UAV hai LiDAR 2D cho SLAM trong nhà, tái tạo 3D và hạ cánh chính xác",
      type: "Dự án cá nhân / UAV",
      meta: "Học kỳ Thu 2025–Hiện tại · Cá nhân · Đang thực hiện",
      description: "Dự án UAV tự hành phục vụ khảo sát môi trường và tái tạo 2D/3D, tập trung vào chuyển giao từ mô phỏng sang thực tế, quản lý tải trọng, nút thắt của quy trình xử lý, sai lệch odometry và độ tin cậy của định vị.",
      tags: ["PX4", "ROS 2", "SLAM", "Raspberry Pi", "Thị giác máy tính"]
    },
    {
      title: "Quadcopter tùy chỉnh sử dụng Teensy 4.1 và MPU6050",
      type: "Hệ thống Vật lý Thông minh",
      meta: "Học kỳ Thu 2026 · Nhóm 4 người · Trưởng nhóm, Kỹ sư Cơ điện tử, Kiểm thử · Đã hoàn thành",
      description: "Một quadcopter được chế tạo từ đầu, thiết kế, lắp ráp và lập trình từ các mô-đun riêng lẻ với bộ điều khiển bay Teensy 4.1, bao gồm tinh chỉnh PID, telemetry, thử nghiệm có ràng buộc và mô phỏng kết cấu.",
      tags: ["Teensy 4.1", "Hệ thống nhúng", "PID", "ANSYS", "Thiết kế 3D"]
    },
    {
      title: "Găng tay robot mềm gân–thủy lực lai hỗ trợ phục hồi chức năng bàn tay sau đột quỵ với trợ lực ngón tay hai chiều",
      type: "Nghiên cứu / Robot mềm",
      meta: "Học kỳ Xuân 2024–Thu 2026 · Nhóm 4 người · Đồng tác giả thứ nhất · Đang phản biện",
      description: "Găng tay phục hồi chức năng đeo được sử dụng cơ nhân tạo mềm và cơ cấu truyền động bằng gân để hỗ trợ bệnh nhân sau đột quỵ bị suy giảm chức năng bàn tay với trợ lực ngón tay theo hai chiều.",
      tags: ["Robot mềm", "Phục hồi chức năng", "MATLAB", "Thiết kế hệ thống", "Thực nghiệm"]
    },
    {
      title: "Bàn tay robot hình người điều khiển từ xa sử dụng cảm biến sợi mềm",
      type: "Nghiên cứu / Robot hình người",
      meta: "Học kỳ Thu 2025–Xuân 2026 · Nhóm 4 người · Tác giả thứ nhất · Đang phản biện",
      description: "Hệ thống điều khiển từ xa sử dụng cảm biến sợi mềm để điều khiển bàn tay robot hình người truyền động bằng gân và được kích hoạt bởi các cơ mềm điều khiển bằng servo.",
      tags: ["Điều khiển từ xa", "Cảm biến mềm", "MATLAB", "Thu thập dữ liệu", "Thiết kế hệ thống"]
    },
    {
      title: "Lấy huyết khối tác động kép: Khái niệm catheter milli-spinner robot mềm hỗ trợ hút và thu giữ mảnh huyết khối",
      type: "Nghiên cứu / Robot mềm",
      meta: "Học kỳ Xuân 2026 · Nhóm 2 người · Tác giả thứ nhất · Đang phản biện",
      description: "Khái niệm robot mềm lấy huyết khối được phát triển nhằm cải thiện lực hút cục bộ quanh catheter milli-spinner, giải quyết một hướng thiết kế tiên tiến nhưng hiện còn ít bằng chứng triển khai thực tế.",
      tags: ["Robot mềm", "Lấy huyết khối", "ANSYS", "Phát triển ý tưởng", "ICARCV 2026"]
    },
    {
      title: "Hệ thống tự động thay dụng cụ cho cánh tay robot hình người",
      type: "Robot và Tự động hóa",
      meta: "Học kỳ Xuân 2026 · Nhóm 3 người · Trưởng nhóm, Kỹ sư Cơ điện tử, Thiết kế Cơ khí, Chế tạo · Đã hoàn thành",
      description: "Hệ thống thay dụng cụ cho cánh tay robot hình người với các cơ cấu chấp hành cuối theo nhiệm vụ như máy khoan, kẹp và đầu hút, tập trung vào độ chính xác căn chỉnh, quản lý tải trọng, tích hợp phần cứng và điều khiển phối hợp.",
      tags: ["Servo", "ESP32", "Python", "Nam châm điện", "Thiết kế 3D"]
    },
    {
      title: "Máy tự động nạp lại mực bút bảng trắng",
      type: "Tổng hợp Cơ khí",
      meta: "Học kỳ Thu 2026 · Nhóm 4 người · Kỹ sư Cơ điện tử, Thiết kế Cơ khí, Chế tạo · Đã hoàn thành",
      description: "Một máy hoàn chỉnh tự động hóa việc nạp mực và thay đầu bút bảng trắng thông qua chế tạo phối hợp, thiết kế cơ cấu, xây dựng trình tự và tích hợp cơ điện.",
      tags: ["Arduino", "CNC", "Thiết kế cơ khí", "Chế tạo", "Tự động hóa"]
    },
    {
      title: "Robot khảo sát môi trường điều khiển bằng cử chỉ tay",
      type: "Cơ điện tử",
      meta: "Học kỳ Thu 2025 · Nhóm 3 người · Trưởng nhóm, Kỹ sư Cơ điện tử, Thiết kế Cơ khí, Chế tạo · Đã hoàn thành",
      description: "Robot di động được điều khiển bằng cử chỉ tay để thu thập dữ liệu cảm biến môi trường và hình ảnh camera. Thiết kế được chuyển từ ý tưởng tự cân bằng không thành công sang nền tảng dẫn động vi sai sau các thách thức về nguồn điện và điều khiển PID.",
      tags: ["ESP32", "NRF24", "OpenIPC", "Cảm biến", "PID"]
    },
    {
      title: "MiniHawk VTOL ba cánh quạt nghiêng",
      type: "Dự án cá nhân / UAV",
      meta: "Học kỳ Xuân 2026 · Cá nhân · Lưu trữ",
      description: "Dự án VTOL đầu tiên dựa trên nền tảng MiniHawk mã nguồn mở của Stephen Carlson, tập trung vào chế tạo bằng in 3D, cơ cấu chuyển đổi góc nghiêng, tích hợp máy bay, giới hạn đi dây, cấu hình và thử nghiệm bay.",
      tags: ["ArduPilot", "VTOL", "Thiết kế 3D", "Điện tử", "Thử nghiệm bay"]
    },
    {
      title: "Hệ thống giám sát và lập bản đồ chất lượng nước không dây",
      type: "Nhập môn CECS",
      meta: "Học kỳ Thu 2023 · Nhóm 5 người · Lập kế hoạch, Thiết kế Cơ khí, Chế tạo · Đã hoàn thành",
      description: "Mô-đun đa cảm biến chất lượng nước được triển khai tại nhiều nguồn nước khác nhau để tạo bản đồ địa lý trực tiếp, với công việc thiết kế tập trung vào đóng gói nhỏ gọn, quản lý nguồn, độ nhất quán của cảm biến và trực quan hóa dữ liệu.",
      tags: ["Cảm biến nước", "Trực quan hóa dữ liệu", "Chế tạo 3D", "IoT", "Lập bản đồ"]
    }
  ];

  const originals = [];
  const cardElements = [...document.querySelectorAll("#projects .project-card")];

  cardElements.forEach((card, index) => {
    originals[index] = {
      title: card.querySelector("h3")?.textContent || "",
      type: card.querySelector(".project-type")?.textContent || "",
      meta: card.querySelector(".project-meta")?.innerHTML || "",
      description: card.querySelector(".project-content > p:not(.project-type):not(.project-meta)")?.textContent || "",
      tags: [...card.querySelectorAll(".project-tags span")].map(el => el.textContent)
    };
  });

  function applyProjectLanguage(language) {
    cardElements.forEach((card, index) => {
      const source = language === "vi" ? cards[index] : originals[index];
      if (!source) return;
      const title = card.querySelector("h3");
      const type = card.querySelector(".project-type");
      const meta = card.querySelector(".project-meta");
      const description = card.querySelector(".project-content > p:not(.project-type):not(.project-meta)");
      if (title) title.textContent = source.title;
      if (type) type.textContent = source.type;
      if (meta) {
        if (language === "vi") meta.textContent = source.meta;
        else meta.innerHTML = source.meta;
      }
      if (description) description.textContent = source.description;
      [...card.querySelectorAll(".project-tags span")].forEach((tag, tagIndex) => {
        if (source.tags[tagIndex]) tag.textContent = source.tags[tagIndex];
      });
    });
  }

  function currentLanguage() {
    return localStorage.getItem("portfolio-language") === "vi" ? "vi" : "en";
  }

  applyProjectLanguage(currentLanguage());

  document.addEventListener("click", event => {
    if (!event.target.closest("#language-toggle")) return;
    requestAnimationFrame(() => applyProjectLanguage(currentLanguage()));
  });
})();

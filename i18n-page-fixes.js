(() => {
  const page = window.location.pathname.split('/').pop();
  const pages = {
    'dual-lidar-uav.html': {
      title: 'UAV hai LiDAR 2D cho SLAM trong nhà, tái tạo 3D và hạ cánh chính xác',
      selectors: {
        '.project-detail h1': 'UAV hai LiDAR 2D cho SLAM trong nhà, tái tạo 3D và hạ cánh chính xác',
        '.project-lead': 'Dự án được phát triển qua xác nhận mô phỏng và triển khai thực tế. Hệ thống kết hợp PX4, ROS 2, SLAM bằng LiDAR ngang, tích lũy quét LiDAR dọc, ước lượng tư thế UAV và hạ cánh chính xác dựa trên AprilTag để vận hành trong nhà không GPS.',
        '.system-summary h2': 'Tổng quan hệ thống',
        '.system-summary p': 'Một LiDAR 2D đặt ngang xây dựng bản đồ trong nhà và hỗ trợ định vị, trong khi LiDAR thứ hai đặt dọc thu thập các lát quét mặt cắt. Các lát quét được biến đổi theo tư thế UAV và tích lũy thành đám mây điểm 3D toàn cục. Camera hướng xuống hỗ trợ phát hiện AprilTag và hạ cánh chính xác trong hệ tọa độ cục bộ.'
      },
      sections: [
        ['Mô phỏng và xác nhận quy trình', 'Kiến trúc phần mềm trước tiên được xác nhận trong PX4 SITL, ROS 2, Gazebo và RViz. Công việc này kiểm tra quỹ đạo khảo sát, hệ tọa độ, hướng LiDAR, đồng bộ tư thế, biến đổi lát quét và tạo đám mây điểm 3D trước khi triển khai lên phần cứng.'],
        ['Triển khai thực tế', 'Quy trình sau đó được triển khai trên UAV PX4 tùy chỉnh với Raspberry Pi 5. Thử nghiệm bao gồm tích hợp cảm biến vật lý, SLAM trong nhà bằng LiDAR ngang, tích lũy quét LiDAR dọc, ước lượng tư thế AprilTag và hạ cánh chính xác. Quy trình tái tạo 3D thực tế đã hoạt động nhưng vẫn đang được tiếp tục cải tiến.']
      ]
    }
  };

  function applyFixes() {
    if (document.documentElement.lang !== 'vi') return;
    const data = pages[page];
    if (!data) return;
    document.title = `${data.title} | Le Hai Trung`;
    Object.entries(data.selectors || {}).forEach(([selector, text]) => {
      const el = document.querySelector(selector);
      if (el) el.textContent = text;
    });
    document.querySelectorAll('.project-section').forEach((section, index) => {
      const row = data.sections?.[index];
      if (!row) return;
      const h2 = section.querySelector(':scope > h2');
      const p = section.querySelector(':scope > p');
      if (h2) h2.textContent = row[0];
      if (p) p.textContent = row[1];
    });
  }

  const run = () => requestAnimationFrame(applyFixes);
  run();
  document.addEventListener('click', event => {
    if (event.target.closest('#language-toggle')) setTimeout(run, 0);
  });
  new MutationObserver(run).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
})();

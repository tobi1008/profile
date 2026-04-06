# Profile App - QuyenLT

Project này là trang Profile cá nhân với giao diện Terminal Hacker.

## 🖥️ CHỨC NĂNG TRANG PROFILE TERMINAL (quyenlt.com)

**1. Giao diện và Trải nghiệm người dùng (UI/UX):**
*   **Phong cách:** Giao diện mô phỏng một cửa sổ Terminal/Command Line (dòng lệnh) đậm chất kỹ thuật của macOS/Linux, phù hợp với profile của một kỹ sư "IT System".
*   **Hiệu ứng (Animation):** Có một nhân vật anime bé nhỏ chạy bộ lặp đi lặp lại ở cạnh trên của Terminal để tạo điểm nhấn vui nhộn.
*   **Cửa sổ Terminal:** Gồm các nút điều khiển (đỏ, vàng, xanh) ở góc trái giống macOS và tiêu đề "Profile QuyenLT" ở giữa.
*   **Thống kê hệ thống giả lập:** Hiển thị phần trăm sử dụng CPU, RAM (Mem), dung lượng Pin (Battery) và Đồng hồ thời gian thực (Giờ/Phút và Ngày/Tháng).
*   **Khởi động (Boot-up):** Khi vừa truy cập, màn hình sẽ hiển thị cấu trúc lệnh chào mừng, thư mục hoặc dòng chữ hiển thị mã ASCII, hình ảnh một hacker và một câu châm ngôn đặc trưng của Admin.
*   **Đa ngôn ngữ (Bilingual):** Hỗ trợ 2 ngôn ngữ là Tiếng Việt (`vi`/`vn`) và Tiếng Anh (`en`), có thể chuyển đổi thông qua nút bấm trên thanh tiêu đề hoặc thông qua gõ lệnh.
*   **Tương tác:** Có con trỏ chuột nhấp nháy mô phỏng chuẩn giao diện dòng lệnh. Bất cứ khi nào người dùng click vào nội dung bên trong, con trỏ sẽ tự động trỏ về ô nhập lệnh để nhập văn bản liền tiếp.

**2. Tập lệnh hỗ trợ và Kết quả hiển thị (CLI Commands):**
Người dùng có thể nhập các lệnh sau vào dấu nhắc lệnh `root@quyenlt:~$` và nhấn `Enter` để xem kết quả:

*   `help` hoặc `ls`
    *   **Kết quả:** In ra danh sách tất cả các lệnh khả dụng trên hệ thống kèm theo mô tả ngắn. 
    *   *(Ví dụ hiển thị: `about // Giới thiệu cá nhân`, `stack // Công nghệ sử dụng`, v.v.)*
*   `about`
    *   **Kết quả:** Hiển thị thông tin cá nhân của chủ hệ thống bao gồm Tên, Vị trí (IT System), Trạng thái hệ thống và Tiểu sử (Bio).
*   `stack`
    *   **Kết quả:** Hiển thị danh sách các công nghệ (Tech Stack) là thế mạnh của Admin dạng các thẻ gọn gàng: `Linux (RHEL)`, `Docker`, `Kubernetes`, `AWS`, `Terraform`, `Ansible`, `Bash`, `Python`, `Nginx`, `PostgreSQL`.
*   `smm`
    *   **Kết quả:** Hiển thị thông tin về dịch vụ Social Media Marketing mà Admin đang cung cấp kèm một đường dẫn trực tiếp.
*   `contact`
    *   **Kết quả:** In ra các phương thức liên hệ hiện có (Email, Facebook, Telegram, Youtube).
*   `lang vi` (hoặc `lang vn`) / `lang en`
    *   **Kết quả:** Chuyển đổi ngôn ngữ của hệ thống sang Tiếng Việt hoặc Tiếng Anh tương ứng.
*   `clear`
    *   **Kết quả:** Lệnh dùng để xóa màn hình hiện tại (xóa toàn bộ lịch sử các lệnh cũ).
*   *(Nhập lệnh bất kỳ không tồn tại)*
    *   **Kết quả:** Trả về thông báo lỗi báo câu lệnh không tồn tại hoặc không hợp lệ.

## CI/CD Pipeline
Hệ thống sử dụng GitHub Actions để tự động deploy:
1.  Build Docker Image
2.  Push lên Docker Hub
3.  Deploy lên VPS (qua SSH & SCP)

Deployed at: https://quyenlt.com
Last updated: 2026-01-30

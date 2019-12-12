# qldt_overload_public
## Hướng dẫn khởi chạy app
1. Chạy bình thường bằng cách kết nối với mysql
  - Sửa file src/mysql/index.js để cấu hình kết nối với mysql trên máy bạn.
  - Tạo một database với tên là "qldtoverload"
  - run app với runtime là nodejs 8 trở lên
2. Sử dụng docker-compose.
  - App có thể chạy bằng docker-compose với một dòng lệnh
  - Setup docker-compose và sử dụng lệnh: docker-compose up
  
# Bạn nên deploy app ở server Việt Nam để đảm bảo app có thể hoạt động tốt. Các server quốc tế đang bị lỗi timeout khi request đến qldt

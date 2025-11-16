# 📘 Non-functional Testing

Non-functional Testing là loại kiểm thử tập trung vào **chất lượng hệ
thống**, không liên quan trực tiếp đến chức năng.\
Nó trả lời câu hỏi:\
\> *"Hệ thống THỰC THI như thế nào?"*\
chứ không phải\
\> *"Hệ thống LÀM gì?"*

------------------------------------------------------------------------

## 🎯 1. Mục tiêu của Non-functional Testing

-   Đảm bảo hệ thống **nhanh**, **ổn định**, **an toàn**, **dễ dùng**.
-   Phát hiện vấn đề hiệu năng trước khi lên production.
-   Đánh giá khả năng chịu tải, độ ổn định, độ tin cậy.
-   Đảm bảo trải nghiệm người dùng tốt.

------------------------------------------------------------------------

## 🔍 2. Non-functional Testing kiểm tra những gì?

### ✔ Performance (Hiệu năng)

-   Thời gian phản hồi (Response Time)
-   TPS/RPS
-   Throughput
-   Tốc độ tải trang
-   Thời gian xử lý API

------------------------------------------------------------------------

### ✔ Load Testing

-   Kiểm tra hệ thống chịu được bao nhiêu load
-   Đánh giá tại mức tải cố định

------------------------------------------------------------------------

### ✔ Stress Testing

-   Khi load vượt ngưỡng → hệ thống phản hồi ra sao?
-   Có crash không?
-   Có tự phục hồi không?

------------------------------------------------------------------------

### ✔ Security Testing

-   SQL Injection
-   XSS
-   CSRF
-   Brute Force
-   Token/Session/Cookie security

------------------------------------------------------------------------

### ✔ Usability Testing

-   Giao diện dễ dùng?
-   Trực quan?
-   Màu sắc -- spacing hợp lý?

------------------------------------------------------------------------

### ✔ Compatibility Testing

-   Chrome, Safari, Firefox
-   Mobile / Desktop
-   Windows / MacOS / Android / iOS

------------------------------------------------------------------------

### ✔ Reliability Testing

-   Memory leak?
-   Long-running API ổn định không?

------------------------------------------------------------------------

### ✔ Maintainability & Scalability

-   Hệ thống dễ bảo trì?
-   Có mở rộng được không?

------------------------------------------------------------------------

## ⭐ 3. Ví dụ: Kiểm thử hiệu năng API Login

### 📘 Mục tiêu

-   Đo thời gian phản hồi khi 100--1000 users cùng login
-   Giữ \< 200--500ms/request

------------------------------------------------------------------------


## 📝 Checklist

-   [ ] Response Time ổn định (P90/P95/P99)?
-   [ ] API không timeout?
-   [ ] Không memory leak?
-   [ ] UI không lag?
-   [ ] Không lộ thông tin nhạy cảm?
-   [ ] Session/token an toàn?
-   [ ] Tương thích nhiều trình duyệt?
-   [ ] Security headers đủ?

------------------------------------------------------------------------

## 💡 Công cụ

### Performance / Load:

-   JMeter
-   K6
-   Locust
-   Gatling

### Security:

-   OWASP ZAP
-   BurpSuite

### Usability:

-   Maze
-   User testing

------------------------------------------------------------------------

## ⚠️ Lỗi người mới hay mắc phải

-   Chỉ test chức năng, quên performance
-   Tin kết quả load test từ môi trường DEV
-   Không kiểm tra P95/P99
-   Không test mạng chậm
-   Không test security endpoints

------------------------------------------------------------------------

## 🎉 Kết luận

Non-functional Testing giúp đảm bảo phần mềm **nhanh -- ổn định -- an
toàn -- dễ dùng**, là nền tảng cho hệ thống hoạt động tốt trong thực tế.

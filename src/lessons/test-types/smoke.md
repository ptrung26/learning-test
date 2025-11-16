# 🔥 Smoke Testing

Smoke Testing là loại kiểm thử nhanh nhằm xác nhận rằng **các chức năng
chính của hệ thống vẫn hoạt động** sau khi build, deploy hoặc cập nhật
phiên bản mới.

> 📌 Mục tiêu: *Kiểm tra xem build có "ổn định" để tiếp tục test hay
> không.*

------------------------------------------------------------------------

## 🎯 1. Smoke Testing dùng để làm gì?

-   Xác minh hệ thống hoạt động ở mức cơ bản.
-   Phát hiện lỗi nghiêm trọng ngay từ đầu.
-   Tiết kiệm thời gian bằng cách tránh test sâu khi build lỗi.
-   Đảm bảo các chức năng cốt lõi chạy được trước khi giao QA/Tester.

------------------------------------------------------------------------

## 🧩 2. Khi nào cần Smoke Testing?

-   Sau mỗi lần backend deploy
-   Sau khi FE build lại UI mới
-   Sau khi merge code lớn
-   Sau khi chạy CI/CD pipeline
-   Khi QA nhận build mới từ Dev

------------------------------------------------------------------------

## 🚀 3. Smoke Testing kiểm tra những gì?

### ✔ Những chức năng cốt lõi nhất:

-   Login hoạt động?
-   Trang Dashboard vào được?
-   API chính có trả dữ liệu?
-   CRUD cơ bản chạy được?
-   Không bị crash trang?
-   Không lỗi 500/404 bất thường?

> ⚠ Không test sâu, **chỉ test xem có chạy được hay không**.

------------------------------------------------------------------------

## ⭐ 4. Ví dụ Smoke Test thực tế

### 🎯 Hệ thống: Website quản lý bán hàng

Các mục cần test nhanh:

1.  Truy cập trang chủ → không lỗi
2.  Login → thành công với tài khoản hợp lệ
3.  Mở trang danh sách sản phẩm → load được data
4.  Thêm sản phẩm → popup mở được
5.  Logout → chuyển về trang login

→ Nếu fail bất kỳ bước nào → build **FAILED** → không test tiếp.

------------------------------------------------------------------------

## 📌 5. Checklist Smoke Test

-   [ ] FE build lên không bị crash
-   [ ] Login chạy được
-   [ ] API chính trả dữ liệu
-   [ ] Navigation hoạt động
-   [ ] Các trang chính mở không lỗi
-   [ ] Không 404/500 bất thường
-   [ ] Không lỗi JS trong console

------------------------------------------------------------------------

## ⚠ Lỗi thường gặp khi làm Smoke Test

-   Test quá sâu → mất thời gian
-   Quên check API → UI load fail nhưng không phát hiện sớm
-   Không log kết quả rõ ràng → khó debug
-   Không ưu tiên đúng chức năng cốt lõi

------------------------------------------------------------------------

## 🧠 Ghi nhớ nhanh

> ➜ Smoke Test = kiểm thử "hít khói"
> ➜ Nếu build đủ khỏe → tiếp tục test
> ➜ Nếu build "bốc khói" → dừng ngay!

------------------------------------------------------------------------

## 🎉 Kết luận

Smoke Testing giúp phát hiện lỗi sớm, tiết kiệm thời gian, và đảm bảo
build ổn định trước khi chuyển sang test chi tiết.
Một dự án chuyên nghiệp luôn có *Smoke Test Checklist* trước mỗi vòng
kiểm thử.

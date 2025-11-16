# 🧠 Sanity Testing

Sanity Testing là loại kiểm thử nhanh nhằm xác định xem **một phần chức
năng cụ thể** (vừa được fix bug hoặc cập nhật) có hoạt động đúng hay
không.

> 📌 *Mục tiêu:* Đảm bảo bản vá (fix) hoặc chức năng mới **không làm
> hỏng** những phần liên quan.

------------------------------------------------------------------------

## 🎯 1. Sanity Testing dùng để làm gì?

-   Kiểm tra nhanh fix bug có hoạt động đúng không.
-   Đảm bảo tính năng mới không phá hỏng flow chính.
-   Tiết kiệm thời gian: không cần kiểm thử toàn bộ hệ thống.
-   Xác minh build có thể tiếp tục làm Regression hay không.

------------------------------------------------------------------------

## 🔍 2. Khi nào cần Sanity Testing?

-   Sau khi Dev sửa một bug cụ thể.
-   Sau khi cập nhật một phần nhỏ của hệ thống.
-   Sau khi thay đổi UI nhỏ.
-   Khi chỉ cần xác nhận một chức năng hẹp, không test full.

------------------------------------------------------------------------

## 🚀 3. Sanity Testing kiểm tra phạm vi nào?

### ✔ Tập trung vào **một chức năng duy nhất**

Ví dụ: Dev sửa lỗi "Không tạo được sản phẩm mới".

Bạn chỉ cần kiểm tra:

-   Mở form tạo sản phẩm → OK
-   Nhập dữ liệu → OK
-   Click Save → OK
-   Data lưu thành công → OK

Không cần kiểm tra list sản phẩm, filter, pagination,...

------------------------------------------------------------------------

### ✔ Kiểm tra input-output trực tiếp

-   Đầu vào → xử lý đúng?
-   Output → hiển thị đúng?
-   Không phát sinh lỗi mới?

------------------------------------------------------------------------

### ✔ Không kiểm tra toàn hệ thống

Đó là việc của **Regression Testing**, không phải Sanity.

------------------------------------------------------------------------

## ⭐ 4. Ví dụ Sanity Test thực tế

### 🛒 Hệ thống: Quản lý sản phẩm

Bug được báo: *Không chỉnh sửa được thông tin sản phẩm*

### Sanity Test cần làm:

1.  Mở trang Edit Product
2.  Chỉnh sửa tên, giá
3.  Nhấn Save
4.  Quan sát:
    -   API update chạy thành công
    -   UI hiển thị dữ liệu mới
    -   Không lỗi mới phát sinh

Nếu cả 4 bước đều ổn → Build **PASS Sanity**

------------------------------------------------------------------------

## 📌 5. Checklist Sanity Test

-   [ ] Bug chính đã được fix?
-   [ ] Chức năng liên quan hoạt động đúng?
-   [ ] Không lỗi mới phát sinh?
-   [ ] UI hiển thị dữ liệu đúng?
-   [ ] API không trả lỗi?
-   [ ] Flow chính không bị ảnh hưởng?

------------------------------------------------------------------------

## ⚠ Lỗi thường gặp khi làm Sanity Test

-   Test quá nhiều → thành Regression Test
-   Quên test input-output trực tiếp
-   Không kiểm tra hành vi bất thường sau khi fix
-   Không ghi lại kết quả rõ ràng

------------------------------------------------------------------------

## 🧠 Ghi nhớ nhanh

> ➜ Smoke: Kiểm tra build có sống không
> ➜ Sanity: Kiểm tra fix có đúng không
> ➜ Regression: Kiểm tra toàn bộ hệ thống

------------------------------------------------------------------------

## 🎉 Kết luận

Sanity Testing giúp QA xác minh nhanh fix bug hoạt động tốt và không gây
lỗi lan sang chức năng khác.
Đây là bước quan trọng trước khi thực hiện Regression Testing.

# 🔄 Regression Testing

Regression Testing là loại kiểm thử nhằm đảm bảo rằng **những chức năng
cũ vẫn hoạt động bình thường** sau khi hệ thống có thay đổi như:

-   Fix bug
-   Thêm tính năng mới
-   Thay đổi logic
-   Refactor code
-   Deploy bản release mới

> 📌 *Mục tiêu:* Xác minh rằng việc cập nhật không tạo ra lỗi mới ở các
> khu vực khác.

------------------------------------------------------------------------

## 🎯 1. Regression Testing dùng để làm gì?

-   Phát hiện lỗi lan rộng sau khi sửa một bug nhỏ.
-   Đảm bảo hệ thống vẫn ổn định sau khi thêm tính năng mới.
-   Kiểm tra toàn bộ nghiệp vụ chính.
-   Giảm rủi ro release build lỗi lên production.
-   Tăng độ tin cậy cho mỗi bản update.

------------------------------------------------------------------------

## 🔍 2. Khi nào cần Regression Testing?

-   Sau khi nhiều bug được fix.
-   Sau khi thêm hoặc chỉnh sửa tính năng.
-   Sau khi merge code lớn.
-   Trước khi audit hoặc publish bản release.
-   Khi muốn đảm bảo hệ thống hoạt động ổn định.

------------------------------------------------------------------------

## 🚀 3. Phạm vi của Regression Testing

### ✔ Toàn bộ chức năng chính (Core Flows)

-   Login / Register
-   Dashboard
-   CRUD chính
-   Các API quan trọng
-   Thanh toán (nếu có)
-   Luồng nghiệp vụ quan trọng

------------------------------------------------------------------------

### ✔ Các chức năng liên quan đến phần được sửa

Nếu Dev sửa module "Sản phẩm", Regression nên test:

-   List sản phẩm
-   Tạo sản phẩm
-   Sửa sản phẩm
-   Xóa sản phẩm
-   Filter, search
-   Liên kết với module khác (kho, đơn hàng...)

------------------------------------------------------------------------

### ✔ Regression UI

-   Button còn hoạt động đúng?
-   Layout không bị vỡ?
-   Không có UI glitch?

------------------------------------------------------------------------

## ⭐ 4. Ví dụ Regression Test thực tế

### 🛒 Hệ thống bán hàng

Dev sửa bug "Không cập nhật được giá sản phẩm".

Regression cần test các phần liên quan:

1.  Cập nhật sản phẩm (bug chính)
2.  Thêm sản phẩm
3.  Xóa sản phẩm
4.  Danh sách sản phẩm load đúng
5.  API sản phẩm không lỗi
6.  Tìm kiếm sản phẩm theo giá
7.  Đồng bộ giá với đơn hàng

→ Nếu tất cả đều OK → regression PASS.

------------------------------------------------------------------------

## 📝 5. Checklist Regression Testing

-   [ ] Flow chính (Login / CRUD / API) hoạt động tốt\
-   [ ] Không xuất hiện bug mới
-   [ ] Dữ liệu hiển thị đúng
-   [ ] Validation vẫn hoạt động
-   [ ] Không crash trang nào
-   [ ] UI không vỡ\
-   [ ] Log không có Error/Exception
-   [ ] Không có API 500/400 bất thường

------------------------------------------------------------------------

## 🛠 6. Kỹ thuật hỗ trợ Regression Testing

### ✔ Test Suite cố định

Danh sách test case cố định chạy sau mỗi build.

### ✔ Automation Regression

-   Selenium
-   Cypress
-   Playwright
-   API regression bằng Postman/Newman

### ✔ Risk-based Regression

Ưu tiên test các phần rủi ro cao trước.

------------------------------------------------------------------------

## ⚠ Lỗi thường gặp

-   Regression quá rộng → tốn thời gian.
-   Chỉ test chức năng liên quan → bỏ sót lỗi lan rộng.
-   Không có test suite cố định → thiếu sót test.
-   Không ghi chú thay đổi → không biết nên regression phần nào.

------------------------------------------------------------------------

## 🧠 Ghi nhớ nhanh

> ➜ Smoke → Build có sống không?
> ➜ Sanity → Fix có đúng không?
> ➜ Regression → Cả hệ thống còn chạy đúng không?

------------------------------------------------------------------------

## 🎉 Kết luận

Regression Testing là một bước **bắt buộc** trong quy trình QA, giúp đảm
bảo hệ thống luôn ổn định dù trải qua nhiều lần cập nhật.
Regression tốt = phần mềm ít lỗi = khách hàng ít phàn nàn.

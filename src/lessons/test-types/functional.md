# 📘 Functional Testing

Functional Testing là kiểm thử chức năng nhằm đảm bảo hệ thống hoạt động
đúng như mô tả trong Requirement/User Story.
Mục tiêu là xác minh hệ thống chạy **đúng logic**, **đúng dữ liệu**, và
**đúng kỳ vọng** của người dùng.

------------------------------------------------------------------------

## 🎯 1. Mục tiêu của Functional Testing

- Kiểm tra chức năng chạy đúng mô tả.
- Đảm bảo các luồng nghiệp vụ (business flows) hoạt động chuẩn.
- Validation dữ liệu đúng (frontend + backend).
- Đảm bảo output phản hồi đúng với input.
- Xác minh nghiệp vụ không sai lệch.
- Phát hiện functional bugs (logic sai, rule sai, xử lý sai).

------------------------------------------------------------------------

## 🔍 2. Functional Testing kiểm tra những gì?

### ✔ Input (đầu vào)

- Dữ liệu người dùng nhập vào.
- Format (email, phone, password...).
- Required fields.
- Min/max length.
- Data type đúng hay chưa.

### ✔ Processing (xử lý)

- Rule nghiệp vụ có đúng không?
- Điều kiện rẽ nhánh (if/else).
- Backend validate.
- Tính toán (giá, tổng tiền, discount...).

### ✔ Output (đầu ra)

- Thông báo đúng.
- Điều hướng đúng trang.
- API trả JSON đúng format.
- UI cập nhật đúng dữ liệu.
- Error message rõ ràng.

### ✔ Các chức năng thường test:

- Forms
- CRUD operations
- Authentication (Login/Register)
- Search & Filter
- Upload file
- Pagination
- Email/OTP

------------------------------------------------------------------------

## 3. Phạm vi Functional Testing

### ✔ Correctness

- Output chính xác?
- Luồng có đúng expectation?

### ✔ Coverage

- Happy case
- Unhappy case
- Edge case

### ✔ Business Rules

- Điều kiện đúng & đủ?
- Ràng buộc hợp lệ?

------------------------------------------------------------------------


## 4. Kỹ thuật hỗ trợ Functional Testing

### 1) Equivalence Partitioning (EP)

Chia dữ liệu thành nhóm hợp lệ / không hợp lệ.

### 2) Boundary Value Analysis (BVA)

Kiểm thử giá trị biên: min - max.

### 3) Decision Table

Dùng khi có nhiều rule rẽ nhánh.

### 4) State Transition Testing

Dùng cho form nhiều trạng thái/step.

------------------------------------------------------------------------

## 5. Mindmap đơn giản cho Functional Testing

    Functional Testing
     ├── Input
     │    ├── Required
     │    ├── Format
     │    ├── Data type
     │    └── Boundary
     ├── Processing
     │    ├── Business rules
     │    ├── Logic
     │    └── Validation
     └── Output
          ├── UI hiển thị đúng
          ├── API trả đúng JSON
          └── Điều hướng đúng flow

------------------------------------------------------------------------

## 6. Lỗi người mới hay mắc phải

- Chỉ test happy case.
- Không test validate ở backend.
- Không test data boundary (min/max).
- Không kiểm tra error message.
- Không test các role khác nhau.
- Không test logic bất thường (network chậm, API fail).

------------------------------------------------------------------------

## 7. Kết luận

Functional Testing là kỹ năng **nền tảng** nhất của Tester.\
Nắm vững Functional Testing giúp bạn viết test case chuẩn, tìm bug
nhanh, và hiểu hệ thống sâu hơn.

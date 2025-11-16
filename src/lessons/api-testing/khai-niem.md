# 🌐 API Testing

API Testing là loại kiểm thử tập trung vào việc xác minh **API hoạt động
đúng, đủ và an toàn** theo yêu cầu.
Khác với UI testing, API testing không cần giao diện -- mà kiểm thử trực
tiếp tầng backend.

> 📌 *Mục tiêu:* Đảm bảo API trả về **đúng dữ liệu**, **đúng logic**,
> **đúng status code**, và **đúng format**.

------------------------------------------------------------------------

## 📘 Danh mục nội dung

### 🌐 API Testing Basics
- [1. API là gì?](#-1-api-là-gì)
- [2. API Testing kiểm tra những gì?](#-2-api-testing-kiểm-tra-những-gì)

### 🔍 Practical Examples
- [3. Ví dụ API thực tế](#-3-ví-dụ-api-thực-tế)
- [4. Checklist API Testing](#-4-checklist-api-testing)
- [5. Công cụ thường dùng](#-5-công-cụ-thường-dùng)

### 🛠 DevTools Skills
- [6. Cách bắt API bằng DevTools](#-6-cách-lấy-api-nhanh-từ-website-bắt-api-bằng-devtools)

### 📌 Final
- [Ghi nhớ nhanh](#-ghi-nhớ-nhanh)
- [Kết luận](#-kết-luận)

-----------------------------------------------------------------------

## 🎯 1. API là gì?

API (Application Programming Interface) là cầu nối giúp các hệ thống
giao tiếp với nhau.
Ví dụ:

-   FE gọi API để lấy danh sách sản phẩm
-   Mobile app gọi API để đăng nhập
-   Hệ thống thanh toán gọi API ngân hàng

API thường sử dụng:

-   **HTTP/HTTPS**
-   **JSON** (phổ biến nhất)
-   **RESTful** hoặc **GraphQL**

------------------------------------------------------------------------

## 🔍 2. API Testing kiểm tra những gì?

### ✔ **Request**

-   Method đúng? (GET/POST/PUT/DELETE)
-   Headers đúng? (Content-Type, Authorization...)
-   Body đúng format?

------------------------------------------------------------------------

### ✔ **Response**

-   `status code` đúng không?
-   Response body đúng structure?
-   Dữ liệu có đúng logic?
-   Trả về đúng field?
-   Trả về đúng kiểu dữ liệu?

------------------------------------------------------------------------

### ✔ **Business Logic**

-   Thêm mới phải trả về ID?
-   Cập nhật phải thay đổi dữ liệu?
-   Xóa phải trả về trạng thái đúng?
-   Validation có hoạt động không?

------------------------------------------------------------------------

### ✔ **Security**

-   Endpoint có cần token?
-   Từ chối truy cập nếu token sai?
-   Không trả data nhạy cảm?
-   Không bị SQL Injection?

------------------------------------------------------------------------

## 🚀 3. Ví dụ API thực tế

### API: **POST /api/login**

**Request body mẫu**

``` json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response thành công**

``` json
{
  "success": true,
  "token": "abc.xyz.123",
  "userId": 10
}
```

**Response lỗi**

``` json
{
  "success": false,
  "message": "Invalid password"
}
```

------------------------------------------------------------------------

## 📝 4. Checklist API Testing

-   [ ] Status code đúng?
-   [ ] Response time dưới mức chấp nhận?
-   [ ] Header trả đủ?
-   [ ] JSON đúng schema?
-   [ ] Field bắt buộc không bị thiếu?
-   [ ] Logic nghiệp vụ đúng?
-   [ ] Error message rõ ràng?
-   [ ] Security headers đầy đủ?

------------------------------------------------------------------------

## 🛠 5. Công cụ thường dùng

-   Postman
-   Newman
-   Swagger / OpenAPI
-   Insomnia
-   JMeter (Performance API)
-   K6
-   BurpSuite (Security API)

------------------------------------------------------------------------

## ⚡ 6. Cách lấy API nhanh từ website (bắt API bằng DevTools)

Khi không có tài liệu API, bạn có thể lấy API trực tiếp từ website.

---

### ✔ Bước 1 — Mở DevTools để bắt API

1. Mở trang web  
2. Nhấn **F12**  
3. Chọn tab **Network**  
4. Chọn filter **XHR** hoặc **Fetch**  
5. Nhấn **Ctrl + L** để xoá log cũ  
6. Thực hiện chức năng cần bắt API trên web

→ API sẽ xuất hiện ở danh sách Network.

---

### ✔ Bước 2 — Xem chi tiết API

#### Headers
- General (Url, Method, Status code) 
- Request headers (Cookie, Token)  

#### Payload
- Xem thông tin body request

#### Response
- Kết quả trả về từ API
---

### ✔ Bước 3 — Copy API sang Postman

Right click → **Copy → Copy as cURL**

→ Dán vào Postman → Postman tự convert.

---

### ✔ Ghi chú quan trọng

- Luôn **Clear log** trước khi thao tác  
- Filter đúng **XHR/Fetch**  
- Xoá cookie/token cá nhân khi copy cURL  
- Chỉ lấy header cần thiết (Authorization, Content-Type)

---

## 🧠 Ghi nhớ nhanh

> API Testing = kiểm tra "bộ não xử lý" của hệ thống
> Không cần UI -- test trực tiếp backend
> Nhanh -- chính xác -- bao phủ logic tốt hơn UI test

------------------------------------------------------------------------

## 🎉 Kết luận

API Testing là kỹ năng quan trọng giúp Tester kiểm tra backend hiệu quả,
tìm lỗi logic sớm và đảm bảo hệ thống hoạt động chính xác.
Nắm vững API Testing giúp bạn nâng cấp lên Automation dễ dàng.

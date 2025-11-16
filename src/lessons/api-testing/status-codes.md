# 🌐 HTTP Status Codes – Hiểu đúng để test API chuẩn

HTTP Status Codes là mã trạng thái mà server trả về sau khi xử lý request.  
Trong API Testing, hiểu đúng status giúp bạn test chính xác và debug nhanh hơn.

---

## 📘 Danh mục nội dung

### 🔢 Status Code Groups
- [1xx – Informational](#-1xx--informational)
- [2xx – Success](#-2xx--success-thành-công)
- [3xx – Redirect](#-3xx--redirect)
- [4xx – Client Error](#-4xx--client-error)
- [5xx – Server Error](#-5xx--server-error)

### 🧪 Use Cases & Examples
- [Khi nào tester cần check Status Code](#-6-khi-nào-tester-cần-check-status-code)
- [Ví dụ minh họa](#-7-ví-dụ-minh-họa)

### 🎯 Final
- [Kết luận](#-🎓-kết-luận)

---

## ⭐ 1. Nhóm mã **1xx – Informational**
> Ít gặp trong API Testing.

| Mã | Ý nghĩa |
|----|--------|
| **100 Continue** | Server xác nhận request hợp lệ |
| **101 Switching Protocols** | Đổi giao thức |

---

## ⭐ 2. Nhóm mã **2xx – Success (Thành công)**
> Tester dùng nhiều nhất.

| Mã | Ý nghĩa | Khi nào dùng |
|----|--------|--------------|
| **200 OK** | Thành công | GET, PUT, PATCH |
| **201 Created** | Tạo mới thành công | POST |
| **202 Accepted** | Chấp nhận xử lý sau | Queue, async |
| **204 No Content** | Thành công nhưng không có body | DELETE |

---

## ⭐ 3. Nhóm mã **3xx – Redirect**
> Ít dùng cho API.

| Mã | Ý nghĩa |
|----|--------|
| **301** | Redirect vĩnh viễn |
| **302** | Redirect tạm |
| **307** | Redirect nhưng giữ nguyên method |

---

## ⭐ 4. Nhóm mã **4xx – Client Error**
> Thường gặp nhất khi test validation.

| Mã | Ý nghĩa | Khi xảy ra |
|----|--------|-------------|
| **400 Bad Request** | Request sai | Body sai format |
| **401 Unauthorized** | Chưa đăng nhập | Thiếu token |
| **403 Forbidden** | Không đủ quyền | Không có role |
| **404 Not Found** | Không tìm thấy | Sai URL / ID |
| **405 Method Not Allowed** | Sai method | Gọi GET vào POST |
| **408 Timeout** | Hết thời gian | Mạng lỗi |
| **409 Conflict** | Trùng dữ liệu | Email trùng |
| **422 Unprocessable Entity** | Validate sai | Form sai |

---

## ⭐ 5. Nhóm mã **5xx – Server Error**
> Backend lỗi hoặc server quá tải.

| Mã | Ý nghĩa | Nguyên nhân |
|----|--------|--------------|
| **500** | Lỗi chung | Code BE lỗi |
| **501** | Chưa implement | API chưa làm |
| **502** | Bad gateway | BE down |
| **503** | Server quá tải | Overload |
| **504** | Gateway timeout | BE xử lý lâu |

---

## 📌 6. Khi nào tester cần check Status Code?

- CRUD API  
- Validate form  
- Test auth  
- Test error handling  
- Khi API trả dữ liệu sai

---

## 🧪 7. Ví dụ minh họa

### ✔ POST tạo user
```json
POST /api/users
{
  "email": "test@gmail.com",
  "password": "123456"
}
```
**Expected:**  
- 201 Created  
- Trả về user mới

---

### ✔ Login sai
**Expected:**  
- 401 Unauthorized  
- “Invalid credentials”

---

### ✔ Email trùng
**Expected:**  
- 409 Conflict  
- “Email already exists”

---

### ✔ Query sai format
```
GET /api/users?page=abc
```
**Expected:**  
- 400 Bad Request

---

## 🎓 Kết luận
Hiểu đúng status code giúp tester viết test chính xác, tìm lỗi nhanh hơn developer 😎.

---

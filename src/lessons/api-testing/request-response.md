# 📦 Request & Response Structure – Hiểu đúng để test API chuẩn

Trong API Testing, “Request & Response Structure” là kiến thức nền quan trọng nhất.  
Tester phải hiểu **client gửi gì** và **server trả gì** để viết test case chính xác và debug nhanh.

---

## 📘 Danh mục nội dung

### 📤 Request Structure
- [1. Request Structure Overview](#-1-request-structure-cấu-trúc-request)
- [URL / Endpoint](#-1-url--endpoint)
- [Method](#-2-method)
- [Headers](#-3-headers)
- [Body](#-4-body-payload)

### 📥 Response Structure
- [2. Response Structure Overview](#-2-response-structure-cấu-trúc-response)
- [Status Code](#-status-code)
- [Response Body](#-response-body-json)
- [Pagination](#-pagination-response)
- [Error Response](#-error-response-cực-quan-trọng)

### 🆚 Comparison
- [3. So sánh Request/Response đúng – sai](#-3-so-sánh-requestresponse-đúng--sai)

### 🧪 Checklist
- [4. Checklist cho Tester](#-4-checklist-cho-tester)

### 🎯 Final
- [Kết luận](#-kết-luận)

---

# ⭐ 1. Request Structure (Cấu trúc Request)

Một request API gồm 4 phần chính:

1. **URL (Endpoint)**
2. **Method (GET/POST/PUT/PATCH/DELETE)**
3. **Headers**
4. **Body (Payload)**

---

## 🔹 1. URL / Endpoint

Ví dụ:
```
GET /api/users?page=1&pageSize=10
```

Tester cần kiểm tra:
- URL đúng chưa?  
- Query params đầy đủ chưa?  
- Param sai → API báo lỗi đúng không?  
- ID tồn tại / không tồn tại → API xử lý đúng không?

---

## 🔹 2. Method

| Method | Dùng để |
|--------|---------|
| GET | Lấy dữ liệu |
| POST | Tạo mới |
| PUT | Cập nhật toàn bộ |
| PATCH | Cập nhật 1 phần |
| DELETE | Xóa |

Method sai → API trả:  
```
405 Method Not Allowed
```

---

## 🔹 3. Headers

Các header quan trọng:

### ✔ Authorization  
```
Authorization: Bearer <token>
```

### ✔ Content-Type  
```
Content-Type: application/json
```

### ✔ Accept-Language  
```
Accept-Language: vi
```

### ✔ API Key  
```
x-api-key: 12345
```

Tester cần test:
- Thiếu header → 401 hoặc 403?  
- Header sai → API phản hồi đúng không?  

---

## 🔹 4. Body (Payload)

Áp dụng cho POST/PUT/PATCH.

Ví dụ body:
```json
{
  "name": "Trung",
  "email": "trung@example.com",
  "age": 21
}
```

Tester cần test:
- Thiếu field → báo lỗi đúng không?  
- Sai format → validate đúng?  
- Sai datatype (string thay vì number)?  
- BE validate đủ chưa?

---

# ⭐ 2. Response Structure (Cấu trúc Response)

Một response gồm:

1. **Status Code**
2. **Headers**
3. **Body (JSON)**

---

## 🔹 Status Code

Một số mã quan trọng:

- 200 → Thành công  
- 201 → Tạo mới  
- 204 → Không trả body  
- 400 → Request sai  
- 401 → Thiếu token  
- 403 → Sai quyền  
- 404 → Không tìm thấy  
- 409 → Trùng dữ liệu  
- 500 → Lỗi server  

---

## 🔹 Response Body (JSON)

Ví dụ chuẩn:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": {
    "id": 10,
    "name": "Trung"
  }
}
```

Tester cần kiểm tra:
- Data đúng format?  
- Field thừa / thiếu?  
- Kiểu dữ liệu đúng chưa?  
- ID trả về đúng?  
- Timestamp đúng chuẩn ISO?

---

## 🔹 Pagination Response

Ví dụ:
```json
{
  "items": [...],
  "totalCount": 120,
  "page": 1,
  "pageSize": 10
}
```

Tester cần test:
- TotalCount đúng?  
- Page cuối?  
- Page rỗng?  
- pageSize hoạt động đúng?

---

## 🔹 Error Response (Cực quan trọng)

Response lỗi tốt:
```json
{
  "success": false,
  "message": "Email already exists",
  "errorCode": "EMAIL_DUPLICATE"
}
```

Tester cần check:
- Lỗi đúng message?  
- Có errorCode để debug?  
- Không trả stacktrace BE?  
- Không trả password/token?

---

# ⭐ 3. So sánh Request/Response đúng – sai

### ✔ Request đúng:
```json
POST /api/users
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

### ✔ Response đúng:
```json
{
  "id": 50,
  "email": "test@gmail.com"
}
```

---

### ❌ Request sai:
```json
POST /api/users
{
  "email": "abc",
  "password": ""
}
```

### ❌ Response đúng dạng lỗi:
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

---

# ⭐ 4. Checklist cho Tester

### ✔ Request Checklist:
- [ ] URL đúng chưa?  
- [ ] Method đúng?  
- [ ] Header đủ chưa?  
- [ ] Body đầy đủ field?  
- [ ] Data type đúng?  

### ✔ Response Checklist:
- [ ] Status code đúng?  
- [ ] JSON đúng format?  
- [ ] Data đúng theo API spec?  
- [ ] Có message lỗi rõ ràng?  
- [ ] Không rò rỉ thông tin nhạy cảm?  
- [ ] Pagination đúng?  

---

# 🎯 Kết luận

Muốn test API hiệu quả, tester phải hiểu rõ:
- **Request gửi lên gồm những gì**
- **Response trả về gồm những gì**
- **Trách nhiệm của FE / BE trong từng phần**

Nắm chắc cấu trúc Request & Response giúp tester:
- Test chính xác  
- Debug nhanh  
- Hiểu rõ nghiệp vụ  
- Làm việc với Dev hiệu quả  

---

# 🔧 HTTP Methods – Hiểu đúng và test đúng

HTTP Methods (phương thức HTTP) là cách client giao tiếp với server.  
Trong API Testing, hiểu đúng từng method giúp bạn viết test chính xác và tránh lỗi nghiệp vụ.

---

## 📘 Danh mục nội dung

### 🔧 HTTP Methods Overview
- [1. Danh sách HTTP Methods](#-1-danh-sách-http-methods-phổ-biến)
- [2. GET – Lấy dữ liệu](#-2-get--lấy-dữ-liệu)
- [3. POST – Tạo mới](#-3-post--tạo-mới)
- [4. PUT – Cập nhật toàn bộ](#-4-put--cập-nhật-toàn-bộ)
- [5. PATCH – Cập nhật một phần](#-5-patch--cập-nhật-một-phần)
- [6. DELETE – Xóa dữ liệu](#-6-delete--xóa-dữ-liệu)

### 🧪 Testing Techniques
- [7. Test Case mẫu theo từng method](#-7-test-case-mẫu-cho-từng-method)
- [8. Lỗi thường gặp](#-8-lỗi-thường-gặp-khi-test-http-methods)

### 📌 Summary
- [9. Ghi nhớ nhanh](#-9-ghi-nhớ-nhanh)

---

## ⭐ 1. Danh sách HTTP Methods phổ biến

| Method   | Chức năng            | Ví dụ              | Dùng khi nào                 |
|----------|-----------------------|---------------------|------------------------------|
| **GET**  | Lấy dữ liệu          | /api/products       | Lấy danh sách, lấy chi tiết |
| **POST** | Tạo mới              | /api/products       | Thêm dữ liệu mới            |
| **PUT**  | Cập nhật toàn bộ     | /api/products/10    | Cập nhật toàn bộ object     |
| **PATCH**| Cập nhật một phần    | /api/products/10    | Cập nhật 1–2 trường         |
| **DELETE**| Xóa dữ liệu         | /api/products/10    | Xóa bản ghi                 |
| **OPTIONS** | Kiểm tra kết nối  | —                   | Dùng trong CORS             |
| **HEAD** | Chỉ lấy header       | —                   | Check tồn tại tài nguyên    |

---

# 🟦 2. GET – Lấy dữ liệu

### ✔ Dùng để:
- Lấy danh sách
- Lấy chi tiết 1 item
- Không có body (quan trọng!)

### ✔ Ví dụ:

```
GET /api/users?page=1&pageSize=10
```

### ✔ Expected khi test:
- Status: `200`
- Response trả đúng dữ liệu
- Không thay đổi dữ liệu trong DB
- Query params hoạt động đúng

---

# 🟩 3. POST – Tạo mới

### ✔ Dùng để:
- Tạo bản ghi mới

### ✔ Ví dụ:

Request:
```json
POST /api/products
{
  "name": "iPhone 15",
  "price": 2000
}
```

Response:
```json
{
  "id": 101,
  "name": "iPhone 15",
  "price": 2000
}
```

### ✔ Expected khi test:
- Status: `201 Created`
- Trả ID mới
- Validation hoạt động
- Không tạo trùng dữ liệu

---

# 🟨 4. PUT – Cập nhật toàn bộ

### ✔ Dùng để:
- Ghi đè toàn bộ object
- Cần truyền đầy đủ các trường

### ✔ Ví dụ:

```
PUT /api/products/10
```

Request body:
```json
{
  "name": "iPhone 15 Pro",
  "price": 2300
}
```

### ✔ Expected:
- Status `200` hoặc `204`
- Toàn bộ dữ liệu phải theo body mới

---

# 🟧 5. PATCH – Cập nhật một phần

### ✔ Dùng để:
- Chỉ cập nhật 1 hoặc vài trường

### Ví dụ:
```
PATCH /api/products/10
```

Body:
```json
{
  "price": 2500
}
```

✔ Không yêu cầu truyền toàn bộ object.

---

# 🟥 6. DELETE – Xóa dữ liệu

### ✔ Dùng để:
- Xóa item theo ID

### Ví dụ:

```
DELETE /api/products/10
```

### Expected:
- Status `200`, `202`, hoặc `204`
- Xóa thành công → GET lại không thấy bản ghi

---

# 🧪 7. Test Case mẫu cho từng method

### **TC-GET-01 – Lấy danh sách sản phẩm**
Expected:
- Status 200
- Có field `items`, `total`
- Không lỗi 500

---

### **TC-POST-01 – Tạo sản phẩm mới**

Expected:
- Status 201
- Trả ID mới
- Validate name, price

---

### **TC-PUT-01 – Cập nhật toàn bộ sản phẩm**

Expected:
- Dữ liệu cũ bị thay đổi hoàn toàn

---

### **TC-PATCH-01 – Cập nhật giá sản phẩm**

Expected:
- Chỉ field được patch thay đổi

---

### **TC-DELETE-01 – Xóa sản phẩm**

Expected:
- Status 204
- Không còn xuất hiện trong GET list

---

# 🧠 8. Lỗi thường gặp khi test HTTP Methods

❌ Gửi body cho GET  
❌ POST vào endpoint của PUT  
❌ PUT nhưng chỉ gửi một phần field  
❌ DELETE mà không kiểm tra GET lại  
❌ POST trùng data nhưng API vẫn cho phép

---

# 📌 9. Ghi nhớ nhanh

- **GET** → đọc dữ liệu  
- **POST** → tạo mới  
- **PUT** → cập nhật toàn bộ  
- **PATCH** → cập nhật một phần  
- **DELETE** → xóa  

HTTP methods là nền tảng để test API chính xác và tránh sai luồng nghiệp vụ.


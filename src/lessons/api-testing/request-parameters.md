# 📌 Request Parameters – Các loại tham số trong API mà Tester cần nắm rõ

Request Parameters là dữ liệu mà client gửi lên server thông qua URL, headers hoặc body.  
Tester cần hiểu từng loại param để test đúng và tìm lỗi nhanh.

---

## 📘 Danh mục nội dung

### 🔹 Core Parameter Types
- [1. Path Parameters](#-1-path-parameters-param-trên-url)
- [2. Query Parameters](#-2-query-parameters-sau-dấu-)
- [3. Header Parameters](#-3-header-parameters)
- [4. Body Parameters](#-4-body-parameters-payload)

### 📤 Upload & Form Types
- [5. Form Data (multipart/form-data)](#-5-form-data-multipartform-data)
- [6. x-www-form-urlencoded](#-6-x-www-form-urlencoded)

### ❗ Khác & Ít gặp
- [7. Matrix Parameters](#-7-matrix-parameters-ít-gặp)
- [8. Cookie Parameters](#-8-cookie-parameters)
- [9. Combined Parameters](#-9-combined-parameters)

### 🧪 Tester Checklist
- [Checklist Request Params](#-🧪-checklist-kiểm-tra-request-parameters)

### 🎯 Final
- [Kết luận](#-kết-luận)

# ⭐ 1. Path Parameters (Param trên URL)

Dùng để xác định 1 resource cụ thể.

### 📍 Ví dụ:
```
GET /api/users/15
```

`15` là userId.

### ✔ Tester cần test:
- ID tồn tại → 200  
- ID không tồn tại → 404  
- ID sai format → 400  
- ID âm / null → phải báo lỗi  

---

# ⭐ 2. Query Parameters (Sau dấu ?)

Dùng để lọc, tìm kiếm, phân trang.

### 📍 Ví dụ:
```
GET /api/products?page=1&pageSize=10&keyword=iphone
```

### ✔ Tester cần test:
- page < 1 → lỗi?  
- pageSize quá lớn → có giới hạn không?  
- keyword có ký tự đặc biệt → xử lý đúng?  
- sort/order có validate không?  

---

# ⭐ 3. Header Parameters

Gửi metadata như token, language, api-key.

### 📍 Ví dụ:
```
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json
Accept-Language: vi
x-api-key: 12345
```

### ✔ Tester cần test:
- Thiếu Authorization → 401  
- Sai Content-Type → 415/400  
- Accept-Language → trả đúng ngôn ngữ?  

---

# ⭐ 4. Body Parameters (Payload)

Dùng trong POST/PUT/PATCH.

### 📍 Ví dụ:
```json
{
  "name": "Trung",
  "email": "trung@example.com",
  "age": 21
}
```

### ✔ Tester cần test:
- Thiếu field → lỗi?  
- Sai datatype → lỗi?  
- Dữ liệu quá dài → báo đúng?  
- BE validate đủ chưa?  

---

# ⭐ 5. Form Data (multipart/form-data)

Dùng để upload file hoặc submit form.

![Postman](/images/api-testing/multile-form-data.png)

### 📍 Ví dụ:
```
file: abc.png
name: Avatar
```

### ✔ Tester cần test:
- File vượt dung lượng → lỗi  
- Sai định dạng → từ chối  
- Upload nhiều file → hệ thống xử lý được không?  

---

# ⭐ 6. x-www-form-urlencoded

Dữ liệu gửi dạng form truyền thống.

### 📍 Ví dụ:
```
grant_type=password&username=admin&password=123
```

✔ Quan trọng khi test OAuth2.

---

# ⭐ 7. Matrix Parameters (Ít gặp)

### 📍 Ví dụ:
```
/api/products;color=blue;size=xl
```

---

# ⭐ 8. Cookie Parameters

Cookie được browser tự gửi kèm request.

### 📍 Ví dụ:
```
Cookie: accessToken=xxx; theme=dark
```

### ✔ Tester cần test:
- Cookie có HttpOnly/Secure?  
- Cookie hết hạn → logout?  
- Browser có tự gửi cookie đúng không?  

---

# ⭐ 9. Combined Parameters

Một request có thể chứa nhiều loại tham số:

### 📍 Ví dụ:
```
PUT /api/users/10?notify=true
Authorization: Bearer token
Body:
{
  "email": "new@gmail.com"
}
```

→ Path param + query + header + body.

---

# 🧪 Checklist kiểm tra Request Parameters

## ✔ Path Params
- [ ] ID tồn tại → 200  
- [ ] ID không tồn tại → 404  
- [ ] ID sai format → 400  

## ✔ Query Params
- [ ] Pagination đúng?  
- [ ] Sort/filter hợp lệ?  
- [ ] Search có xử lý ký tự đặc biệt?  

## ✔ Header Params
- [ ] Token hợp lệ?  
- [ ] Thiếu token → 401?  

## ✔ Body Params
- [ ] Thiếu field → lỗi?  
- [ ] Sai datatype?  
- [ ] Chuỗi quá dài?  

## ✔ File Upload
- [ ] Dung lượng đúng?  
- [ ] Định dạng đúng?  

---

# 🎯 Kết luận

Hiểu rõ các loại Request Parameters giúp tester:
- Test API chính xác  
- Debug nhanh  
- Hiểu nghiệp vụ tốt hơn  
- Dùng Postman hiệu quả  

---

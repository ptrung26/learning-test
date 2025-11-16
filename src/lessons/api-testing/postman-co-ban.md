# 🧪 Postman Cơ Bản – Dành Cho Tester Bắt Đầu Test API

Postman là công cụ quan trọng nhất cho tester khi làm API Testing.  
Mục tiêu phần này:  
- Hiểu Postman dùng làm gì  
- Gửi GET/POST/PUT/DELETE  
- Xem response  
- Dùng environment  
- Lưu API vào collection  

---

## 📘 Danh mục nội dung

### 🌐 Postman Basics
- [1. Postman dùng để làm gì?](#-1-postman-dùng-để-làm-gì)
- [2. Gửi request GET đầu tiên](#-2-gửi-request-get-đầu-tiên)
- [3. Query Params](#-3-gửi-request-với-query-params)

### 🔧 CRUD Operations
- [4. POST – Gửi body JSON](#-4-gửi-post-với-body)
- [5. PUT / PATCH / DELETE](#-5-put--patch--delete)

### 🔐 Authentication & Environment
- [6. Thêm Headers](#-6-thêm-headers)
- [7. Gửi API Key](#-7-gửi-api-key)
- [8. Environment Variables](#-8-environment-variables)

### 📁 Productivity
- [9. Collection cơ bản](#-9-collection--lưu-api-để-reuse)
- [10. Test Script cơ bản](#-10-test-script-cơ-bản)
- [11. Checklist Postman](#-11-checklist-postman-cơ-bản)

### 📌 Final
- [Kết luận](#-kết-luận)

---

# ⭐ 1. Postman dùng để làm gì?

- Gửi request API  
- Test nhanh Backend  
- Xem response (status, headers, JSON)  
- Tạo môi trường DEV / UAT / PROD  
- Tự động hóa test bằng script  
- Gọi API không cần UI  

---

# ⭐ 2. Gửi request GET đầu tiên

### Ví dụ:
```
GET https://jsonplaceholder.typicode.com/users
```

### Thao tác:
1. New → HTTP Request  
2. Chọn **GET**  
3. Dán URL  
4. Click **Send**

### Kiểm tra:
- Status code  
- Response time  
- JSON body  
- Headers  

---

# ⭐ 3. Gửi request với Query Params

Ví dụ:
```
GET /api/products?page=1&pageSize=10&keyword=iphone
```

Trong Postman:
- Tab **Params**  
- page: 1  
- pageSize: 10  
- keyword: iphone  

URL sẽ tự cập nhật.

---

# ⭐ 4. Gửi POST với Body

Ví dụ:
```
POST /api/users
```

Body:
```json
{
  "name": "Trung",
  "email": "trung@example.com"
}
```

Thao tác:
1. Method: **POST**  
2. Tab **Body**  
3. Chọn **raw**  
4. Chọn **JSON**  
5. Dán JSON → Send  

---

# ⭐ 5. PUT / PATCH / DELETE

### PUT – cập nhật toàn bộ
```
PUT /api/users/10
```

### PATCH – cập nhật 1 phần
```
PATCH /api/users/10
```

### DELETE – xóa user
```
DELETE /api/users/10
```

---

# ⭐ 6. Thêm Headers

Ví dụ gửi token:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Trong Postman:
- Tab **Headers → Add**  
- Key: Authorization  
- Value: Bearer xxx  

---

# ⭐ 7. Gửi API Key

```
x-api-key: 12345
```

Giống như header ở trên.

---

# ⭐ 8. Environment Variables

Dùng để đổi môi trường nhanh:

### Tạo biến:
- Click Environment → Add  
- baseUrl  
- token  

### Sử dụng:
```
{{baseUrl}}/api/users
```

Header:
```
Authorization: Bearer {{token}}
```

---

# ⭐ 9. Collection – Lưu API để reuse

- Click **Save**  
- Create collection  
- Đặt tên module  
- Lưu các API liên quan vào cùng collection  

Tester thường chia:
- Auth  
- Users  
- Orders  
- Products  

---

# ⭐ 10. Test Script cơ bản

Kiểm tra status:
```js
pm.test("Status phải là 200", function () {
  pm.response.to.have.status(200);
});
```

Kiểm tra field:
```js
pm.test("Response có id", function () {
  const json = pm.response.json();
  pm.expect(json.id).to.exist;
});
```

---

# 🧪 Checklist Postman cơ bản

- [ ] Gửi được GET/POST/PUT/DELETE  
- [ ] Params dùng đúng  
- [ ] Gửi JSON body đúng  
- [ ] Header đầy đủ  
- [ ] Environment chạy được  
- [ ] Lưu collection  
- [ ] Đọc response đúng  
- [ ] Hiểu status code  

---

# 🎯 Kết luận

Biết Postman cơ bản → Tester đã có thể:
- Test API nhanh gấp 5–10 lần  
- Debug FE/BE hiệu quả  
- Viết test case chuẩn  
- Hiểu rõ luồng dữ liệu hệ thống  

---

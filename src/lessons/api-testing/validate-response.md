# 🧪 Validation Response – Kiểm tra phản hồi API

Validation Response là phần quan trọng nhất trong API Testing.  
Tester cần kiểm tra: API trả đúng dữ liệu? đúng cấu trúc? đúng datatype? đúng nghiệp vụ?

---

## 📘 Danh mục nội dung

### 🧪 Validation Essentials
- [1. Kiểm tra Status Code](#-1-kiểm-tra-status-code)
- [2. Kiểm tra Structure JSON](#-2-kiểm-tra-structure-cấu-trúc-json)
- [3. Kiểm tra Data Type](#-3-kiểm-tra-data-type-kiểu-dữ-liệu)
- [4. Kiểm tra Value & Logic](#-4-kiểm-tra-value-đúng-nghiệp-vụ)
- [5. Kiểm tra Pagination](#-5-kiểm-tra-pagination)
- [6. Kiểm tra Error Message](#-6-kiểm-tra-error-message)

### 📦 Response Metadata
- [7. Kiểm tra Header Response](#-7-kiểm-tra-header-response)
- [8. Kiểm tra Response Time](#-8-kiểm-tra-response-time)
- [9. Kiểm tra Security](#-9-kiểm-tra-response-security)

### 🧩 Automation
- [10. Validation bằng Postman Script](#-10-validation-bằng-postman-script)

### 🧪 Checklist
- [Checklist Validation Response](#-🧪-checklist-validation-response)

### 🎯 Final
- [Kết luận](#-kết-luận)

---

# ⭐ 1. Kiểm tra Status Code

| Status | Ý nghĩa |
|--------|--------|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 204 | Không có body |
| 400 | Sai request |
| 401 | Thiếu token |
| 403 | Không đủ quyền |
| 404 | Không tìm thấy |
| 409 | Trùng dữ liệu |
| 500 | Lỗi server |

---

# ⭐ 2. Kiểm tra Structure (Cấu trúc JSON)

Ví dụ response chuẩn:

```json
{
  "success": true,
  "message": "OK",
  "data": {
    "id": 12,
    "name": "Trung"
  }
}
```

### Cần kiểm tra:
- Có đầy đủ field không?  
- Không để lộ thông tin nhạy cảm  
- JSON đúng format  

---

# ⭐ 3. Kiểm tra Data Type (Kiểu dữ liệu)

| Field | Kiểu đúng | Kiểu sai |
|-------|-----------|----------|
| id | number | string |
| createdAt | string ISO | timestamp thô |
| price | number | string |

---

# ⭐ 4. Kiểm tra Value đúng nghiệp vụ

Ví dụ API Login:
- Đăng nhập sai → không trả token  
- Account bị khóa → message đúng  

Ví dụ API Order:
- Tổng tiền = sum(items)  
- Status mới tạo = "Pending"  

---

# ⭐ 5. Kiểm tra Pagination

```json
{
  "items": [],
  "totalCount": 124,
  "page": 1,
  "pageSize": 10
}
```

### Cần kiểm tra:
- totalCount đúng?  
- page vượt max → items rỗng?  
- pageSize có giới hạn không?  

---

# ⭐ 6. Kiểm tra Error Message

Response lỗi chuẩn:

```json
{
  "success": false,
  "message": "Email already exists",
  "errorCode": "EMAIL_EXISTS"
}
```

### Lưu ý:
- Không trả stacktrace  
- Message rõ ràng  

---

# ⭐ 7. Kiểm tra Header Response

Quan trọng:
- Content-Type  
- Cache-Control  
- Set-Cookie  
- X-Request-ID  

---

# ⭐ 8. Kiểm tra Response Time

Chuẩn:
- < 500ms → tốt  
- < 1s → chấp nhận  
- > 2s → cần báo  

---

# ⭐ 9. Kiểm tra Response Security

Không được trả:
- password  
- token clear text  
- thông tin người khác  
- lỗi BE (stacktrace)  

---

# ⭐ 10. Validation bằng Postman Script

### Kiểm tra status:
```js
pm.test("Status = 200", () => {
  pm.response.to.have.status(200);
});
```

### Kiểm tra field:
```js
pm.test("Có id", () => {
  pm.expect(pm.response.json().data.id).to.exist;
});
```

### Kiểm tra datatype:
```js
pm.test("id là number", () => {
  pm.expect(pm.response.json().data.id).to.be.a("number");
});
```

### Kiểm tra schema:
```js
const schema = {
  type: "object",
  required: ["id", "name"]
};
pm.test("Đúng schema", () => {
  pm.response.to.have.jsonSchema(schema);
});
```

---

# 🧪 Checklist Validation Response

### ✔ Status Code
- [ ] Thành công đúng mã  
- [ ] Lỗi đúng mã  

### ✔ JSON Structure
- [ ] Đủ field  
- [ ] Không lộ thông tin nội bộ  

### ✔ Logic
- [ ] Giá trị đúng nghiệp vụ  

### ✔ Pagination
- [ ] TotalCount đúng  

### ✔ Error message
- [ ] Rõ ràng, đúng format  

### ✔ Performance
- [ ] Response < 1s  

---

# 🎯 Kết luận

Validation Response giúp:
- Tìm lỗi logic  
- Tìm lỗi bảo mật  
- Viết test case chính xác  
- Đảm bảo API hoạt động đúng  

---

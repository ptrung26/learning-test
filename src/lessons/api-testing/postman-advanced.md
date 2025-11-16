# 🚀 Postman Nâng Cao – Dành Cho Tester Muốn Lên Level

Postman nâng cao giúp tester:
- Tự động hóa quy trình test  
- Sinh token tự động  
- Chạy nhiều test case theo data Excel/JSON  
- Validate response bằng script  
- Tạo workflow nhiều bước  
- Mock API  
- Test load đơn giản  

---

## 📘 Danh mục nội dung

### 🔧 Automation & Scripts
- [1. Pre-request Script](#-1-pre-request-script--script-chạy-trước-khi-gửi-request)
- [2. Test Script](#-2-test-script--kiểm-tra-response-tự-động)

### 🔐 Token Workflow
- [3. Auto Login](#-3-auto-login--lấy-token-sau-login)
- [4. Auto Refresh Token](#-4-auto-refresh-token-nếu-token-hết-hạn)

### ⚡ Performance & Runner
- [5. Collection Runner](#-5-collection-runner--chạy-hàng-loạt-api)
- [6. Data-driven Testing](#-6-data-driven-testing-exceljson)

### 🧩 Advanced Tools
- [7. Dynamic Variables](#-7-dynamic-variables--biến-động)
- [8. Postman Console](#-8-debug-bằng-postman-console)
- [9. Authorization nâng cao](#-9-authorization-nâng-cao)
- [10. Upload file](#-10-upload-file-multipartform-data)
- [11. Mock Server](#-11-mock-server)
- [12. Monitor](#-12-monitor--chạy-api-theo-lịch)
- [13. Newman CLI](#-13-newman--automation-cli)

### 📌 Final
- [Kết luận](#-kết-luận)

---

# ⭐ 1. Pre-request Script – Script chạy trước khi gửi request

Dùng để:
- Tạo token  
- Sinh HMAC  
- Sinh timestamp  
- Sinh dữ liệu random  

### Ví dụ tạo timestamp:
```js
pm.environment.set("timestamp", Date.now());
```

### Ví dụ email ngẫu nhiên:
```js
pm.environment.set("randomEmail", `test_${Date.now()}@mail.com`);
```

### Ví dụ HMAC SHA256:
```js
const secret = "12345";
const body = pm.request.body.raw;
const signature = CryptoJS.HmacSHA256(body, secret).toString();
pm.environment.set("signature", signature);
```

---

# ⭐ 2. Test Script – Kiểm tra response tự động

### ✔ Kiểm tra status:
```js
pm.test("Status = 200", () => {
  pm.response.to.have.status(200);
});
```

### ✔ Kiểm tra field:
```js
pm.test("Có field id", () => {
  pm.expect(pm.response.json().id).to.exist;
});
```

### ✔ Kiểm tra message:
```js
pm.test("Message đúng", () => {
  pm.expect(pm.response.json().message).to.equal("Success");
});
```

### ✔ Validate schema:
```js
const schema = {
  type: "object",
  required: ["id", "name"],
};
pm.test("Schema hợp lệ", () => {
  pm.response.to.have.jsonSchema(schema);
});
```

---

# ⭐ 3. Auto Login – Lấy token sau login

```js
const json = pm.response.json();
pm.environment.set("token", json.accessToken);
```

➡ Các API khác chỉ cần:
```
Authorization: Bearer {{token}}
```

---

# ⭐ 4. Auto Refresh Token nếu token hết hạn

```js
if (pm.response.code === 401) {
    pm.sendRequest({
        url: pm.environment.get("baseUrl") + "/auth/refresh",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({ refreshToken: pm.environment.get("refreshToken") })
        },
        header: { "Content-Type": "application/json" }
    }, (err, res) => {
        const data = res.json();
        pm.environment.set("token", data.accessToken);
    });
}
```

---

# ⭐ 5. Collection Runner – Chạy hàng loạt API

Bạn có thể chạy:
- 10 test case  
- 100 test case  
- 1000 test case  

Runner hỗ trợ:
- Environment  
- Data file  
- Báo cáo  

---

# ⭐ 6. Data-Driven Testing (Excel/JSON)

### File data:
```json
[
  { "email": "a@gmail.com", "password": "123" },
  { "email": "b@gmail.com", "password": "pass" }
]
```

### Body:
```
{
  "email": "{{email}}",
  "password": "{{password}}"
}
```

---

# ⭐ 7. Dynamic Variables – Biến động

| Biến | Mô tả |
|------|------|
| `{{$randomInt}}` | số random |
| `{{$randomEmail}}` | email random |
| `{{$timestamp}}` | thời gian |
| `{{$randomUUID}}` | UUID |

---

# ⭐ 8. Debug bằng Postman Console

```
Ctrl + Alt + C
```

### Debug:
```js
console.log(pm.response.json());
```

---

# ⭐ 9. Authorization nâng cao

✔ API Key  
✔ OAuth2  
✔ Hawk  
✔ Digest  
✔ NTLM  

---

# ⭐ 10. Upload file (multipart/form-data)

- Tab **Body → form-data**  
- Key: file  
- Type: File  

---

# ⭐ 11. Mock Server

Dùng khi backend chưa xong API.

---

# ⭐ 12. Monitor – Chạy API theo lịch

- 10 phút/lần  
- 1 giờ/lần  
- Hằng ngày  

---

# ⭐ 13. Newman – Automation CLI

Chạy Postman bằng terminal:

```
newman run collection.json -e env.json
```

Dùng trong:
- Jenkins  
- GitLab CI  
- Azure DevOps  

---

# 🎯 Kết luận

Nắm Postman nâng cao giúp tester:
- Tăng tốc test API 10 lần  
- Tự động hóa 70% công việc  
- Quản lý token chuyên nghiệp  
- Debug như developer  

---

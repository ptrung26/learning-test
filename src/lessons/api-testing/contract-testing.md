# 🚀 Contract Testing – JSON Schema & Pact (Dành cho Tester)

Contract Testing đảm bảo Frontend ↔ Backend hoặc Service A ↔ Service B giao tiếp đúng format đã thỏa thuận.

---

## 📘 Danh mục nội dung

### 📜 Tổng quan
- [1. Contract Testing là gì?](#-contract-testing--json-schema--pact-dành-cho-tester)
- [2. Contract Testing dùng để làm gì?](#-contract-testing-dùng-để-làm-gì)

### 🧩 JSON Schema Validation (Tester dùng nhiều nhất)
- [3. JSON Schema Validation](#-phần-1--json-schema-validation-tester-dùng-nhiều-nhất)
- [4. Tester dùng JSON Schema để làm gì?](#-tester-dùng-json-schema-để)
- [5. Validate Schema bằng Postman](#-validate-schema-bằng-postman)

### 🔗 Pact – Contract Testing cho microservices
- [6. Pact là gì?](#-phần-2--pact-contract-testing-cho-microservices)
- [7. Ví dụ Consumer tạo Contract](#-ví-dụ-consumer-tạo-contract)
- [8. Provider Verify Contract](#-provider-verify-contract)

### ⭐ Lợi ích & So sánh
- [9. Lợi ích Pact](#-lợi-ích-pact)
- [10. So sánh JSON Schema vs Pact](#-so-sánh-json-schema-vs-pact)

### 🧠 Kinh nghiệm & Kết luận
- [11. Khi nào dùng cái nào?](#-khi-nào-dùng-cái-nào)
- [12. Kết luận](#-kết-luận)

---

# 🎯 Contract Testing dùng để làm gì?

- Đảm bảo API không thay đổi format gây lỗi FE  
- Bắt lỗi BE phá cấu trúc JSON  
- Đảm bảo microservices hoạt động đúng  
- Giảm bug tích hợp  
- Tự động hóa kiểm tra giao tiếp giữa hệ thống  

---

# 🧩 Phần 1 — JSON Schema Validation (Tester dùng nhiều nhất)

Ví dụ response:
```json
{
  "id": 12,
  "name": "Iphone 15",
  "price": 20000000,
  "tags": ["phone", "apple"]
}
```

Schema tương ứng:
```json
{
  "type": "object",
  "required": ["id", "name", "price"],
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "price": { "type": "number" },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}
```

---

## ✔ Tester dùng JSON Schema để:

- Kiểm tra datatype  
- Kiểm tra fields required  
- Kiểm tra field thừa/sai tên  
- Kiểm tra nested object  

---

## 🧪 Validate Schema bằng Postman

Trong tab **Tests**:

```js
const schema = {
  type: "object",
  required: ["id", "name", "price"],
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    price: { type: "number" }
  }
};

pm.test("Đúng JSON Schema", function () {
    pm.response.to.have.jsonSchema(schema);
});
```

---

# 🧩 Phần 2 — Pact (Contract Testing cho microservices)

Pact là thư viện Contract Testing phổ biến nhất.

✔ Consumer: FE / Mobile  
✔ Provider: Backend service  

“Consumer định nghĩa format API → Provider phải tuân theo”.

---

# 🔄 Ví dụ Consumer tạo Contract

```js
provider
  .given("Product 10 exists")
  .uponReceiving("Get product details")
  .withRequest({
    method: "GET",
    path: "/product/10"
  })
  .willRespondWith({
    status: 200,
    body: {
      id: 10,
      name: "Iphone X",
      price: 1200
    }
  });
```

Contract này sẽ được publish lên **Pact Broker**.

---

# 🧪 Provider Verify Contract

Provider tải contract xuống và verify:

- Kiểu dữ liệu đúng?  
- Field đúng?  
- Không thay đổi format?  

Nếu sai → CI/CD fail → không cho deploy.

---

# 🎯 Lợi ích Pact

- Phát hiện lỗi BE phá API trước khi ra production  
- FE & BE làm song song  
- Giảm bug integration > 80%  
- Đảm bảo service A/B/C không “phá nhau”  
- Tự động chạy trong pipeline CI  

---

# 🧪 So sánh JSON Schema vs Pact

| Tiêu chí | JSON Schema | Pact |
|---------|-------------|------|
| Người dùng | Tester | Dev FE/BE |
| Độ khó | Dễ | Khó hơn |
| Dùng cho | Test API | Microservices |
| Kiểm tra | Response JSON | Request + Response |
| Mức độ đảm bảo | Cấu trúc data đúng | Giao tiếp giữa service đúng |

---

# 🧠 Khi nào dùng cái nào?

✔ Dự án nhỏ–vừa → JSON Schema là đủ  
✔ Dự án lớn, microservices → BẮT BUỘC Pact  

---

# 🎉 Kết luận

Contract Testing giúp hệ thống ổn định:

- FE không crash vì BE đổi field  
- BE không phá API cũ  
- Dev làm song song  
- Giảm công sức tester  
- Giảm bug tích hợp  

---


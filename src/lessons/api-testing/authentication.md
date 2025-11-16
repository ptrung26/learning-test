# 🔐 Authentication – Các loại Auth mà Tester cần phải biết

Authentication (Xác thực) là cách hệ thống kiểm tra “Bạn là ai?”.  
Trong API Testing, hiểu rõ các loại Auth giúp tester viết test chuẩn, tránh lỗi 401/403 và phát hiện lỗ hổng bảo mật.


---

## 📘 Danh mục nội dung

### 🔐 Authentication Basics
- [1. Basic Authentication](#-1-basic-authentication)
- [2. API Key Authentication](#-2-api-key-authentication)
- [3. Bearer Token (JWT)](#-3-bearer-token-jwt-token)

### 🌐 Advanced Authentication
- [4. OAuth2 Login](#-4-oauth2--login-google-facebook-apple)
- [5. Refresh Token Flow](#-5-refresh-token-flow)

### 🍪 Web Security Auth
- [6. Session Authentication](#-6-session-authentication-cookie-session)
- [7. Cookie-based JWT](#-7-cookie-based-jwt-authentication-token-gui-qua-cookie)

### 📊 Comparison
- [8. So sánh các loại Auth](#-8-so-sanh-cac-loai-auth)

---

#  1. Basic Authentication

### 👉 Cách hoạt động:
Gửi `username:password` dạng Base64 trong Header:

```
Authorization: Basic base64(username:password)
```

### ✔ Ưu điểm:
- Dễ test  
- Postman hỗ trợ sẵn  

### ❌ Nhược:
- Không an toàn  
- Không dùng cho hệ thống lớn

### 🧪 Tester cần test:
- Sai thông tin → 401  
- Không gửi header → 401  
- Đúng → 200  

---

#  2. API Key Authentication

### 👉 Gửi API key qua Header:
```
x-api-key: 12345
```

hoặc query:
```
GET /api/list?key=12345
```

### ✔ Ưu điểm:
- Dễ test  
- Dùng nhiều với public API

### 🧪 Tester cần test:
- Key sai/thiếu → 401  
- Key hết hạn → 403  

---

#  3. Bearer Token (JWT Token)

### 👉 FE gửi token trong Header:

```
Authorization: Bearer <jwt-token>
```

### ✔ Dùng cho:
- SPA (React, Angular, Vue)  
- Mobile App  
- API hiện đại  

### 🧪 Tester cần test:
- Thiếu token → 401  
- Token sai → 401  
- Token đúng nhưng thiếu quyền → 403  
- Token đúng → 200  
- Token hết hạn → 401  

---

#  4. OAuth2 – Login Google, Facebook, Apple

### 👉 Flow:
1. FE redirect user đến Google  
2. User login  
3. Google trả mã code  
4. Server đổi code → Access Token  
5. FE dùng Access Token để gọi API

### 🧪 Tester cần test:
- Token hết hạn → refresh?  
- Sai redirect_uri → 400  
- Scope thiếu → 403  

---

#  5. Refresh Token Flow

### 👉 FE xin token mới bằng Refresh Token:
```json
POST /auth/refresh
{
  "refreshToken": "abcd..."
}
```

Server trả về:
```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

### 🧪 Tester cần test:
- Refresh token sai/hết hạn → 401  
- Trả về token mới đúng format?  
- Access token cũ không dùng được?  

---

#  6. Session Authentication (Cookie Session)

### 👉 Server tạo session và lưu sessionId trong cookie (Header):

```
Set-Cookie: sessionId=xyz; HttpOnly
```

### ✔ Dùng trong:
- Web cũ (PHP, Laravel, ASP.NET MVC)  
- Hệ thống nội bộ  

### 🧪 Tester cần test:
- Hết session → redirect login  
- Clear cookies → mất login  
- CSRF token có hoạt động?  

---

#  7. Cookie-Based JWT Authentication (Token gửi qua Cookie)

### 👉 Server set token qua cookie (Header):

```
Set-Cookie: accessToken=xxx; HttpOnly; Secure; SameSite=Strict
```

Browser tự gửi lại cookie khi gọi API.

---

## 🍪 Ưu điểm của Cookie Auth

| Ưu điểm | Giải thích |
|--------|------------|
| **Chống XSS** | HttpOnly: JS không đọc được token |
| **Tự gửi token** | FE không cần xử lý |
| **An toàn hơn localStorage** | Token không bị lộ nếu FE bị hack |

---

## ⚠ Nhược điểm

| Nhược | Giải thích |
|------|------------|
| Dễ bị CSRF | Nếu không set `SameSite=Strict` |
| Không dùng cho mobile app | Mobile không tự gửi cookie |
| Cần backend cấu hình kỹ | Nhiều flag bảo mật |

---

# 🔐 Các flag bảo mật của Cookie

| Flag | Ý nghĩa |
|------|--------|
| **HttpOnly** | FE không đọc được cookie |
| **Secure** | Chỉ gửi qua HTTPS |
| **SameSite=Strict** | Chống CSRF |
| **Path=/api** | Chỉ gửi cookie cho API |
| **Max-Age** | Thời gian sống cookie |

---

# 🧪 Tester cần test Cookie Token:

- [ ] Cookie có được set hay không?  
- [ ] Có `HttpOnly`, `Secure`, `SameSite`?  
- [ ] Cookie có được gửi lại khi FE gọi API?  
- [ ] Login xong mà không có cookie → lỗi  
- [ ] Token hết hạn → 401  
- [ ] CSRF có hoạt động?  
- [ ] Cookie bị xóa → logout?  

---

#  8. So sánh các loại Auth

| Loại | Bảo mật | Dễ test | Dùng cho |
|------|---------|---------|----------|
| Basic | ❌ | ✔✔ | API nhỏ |
| API Key | ⚠️ | ✔ | Public API |
| JWT Header | ✔✔ | ✔✔ | SPA, Mobile |
| Cookie Token | ✔✔✔ | ✔ | Web bảo mật cao |
| OAuth2 | ✔✔✔ | Khó | App lớn |
| Session | ✔ | ✔ | Web truyền thống |

---

# 🎯 Kết luận

Authentication là phần cực quan trọng của API Testing.  
Tester nắm rõ các loại Auth sẽ tránh được lỗi:

- 401 Unauthorized  
- 403 Forbidden  
- Token hết hạn  
- CSRF / XSS  
- Sai phân quyền  

Và test chuẩn hơn cả developer 😎

---

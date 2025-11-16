# 🌐 API Testing – IP Address & Security

Tài liệu này tập trung **duy nhất** vào chủ đề kiểm thử IP trong API —  
một trong những bước bảo mật quan trọng trong dự án nội bộ.

> 📌 *Mục tiêu:* Giúp Tester hiểu IP là gì, vì sao API phải kiểm tra IP, và cách viết test case liên quan IP trong dự án thực tế.

---

## 📘 Danh mục nội dung
- [1. IP là gì?](#1-ip-là-gì)
- [2. Các loại IP Tester cần biết](#2-các-loại-ip-tester-cần-biết)
- [3. Vì sao API cần kiểm tra IP?](#3-vì-sao-api-cần-kiểm-tra-ip)
- [4. Cách Tester kiểm tra IP của request](#4-cách-tester-kiểm-tra-ip-của-request)
- [5. Các lỗi thường gặp khi IP không hợp lệ](#5-các-lỗi-thường-gặp-khi-ip-không-hợp-lệ)
- [6. Ghi nhớ nhanh cho Tester](#6-ghi-nhớ-nhanh-cho-tester)

---

## 1. IP là gì?

**IP Address** là địa chỉ giúp nhận diện thiết bị trong mạng.  
Khi tester gọi API từ website hoặc Postman → API sẽ biết bạn đến từ IP nào.

Trong kiểm thử API, IP được dùng để:
- Phân biệt request nội bộ (internal) với request bên ngoài (public)
- Kiểm soát truy cập API
- Tăng cường bảo mật

Bạn có thể hiểu **IP giống như “địa chỉ nhà” của mỗi thiết bị trong mạng**.  
Nhờ có IP, hệ thống API biết được:

- Ai đang gửi request?
- Người đó đến từ mạng nội bộ hay từ Internet bên ngoài?
- Có được phép truy cập API hay không?

---

## 2. Các loại IP Tester cần biết

### 🔹 1. Public IP (IP công cộng)
- Là IP khi bạn dùng internet tại nhà/4G.
- Được các API **nhìn thấy trực tiếp** khi bạn gọi từ Postman, trình duyệt.
- Ví dụ:
  - `113.22.14.55`
  - `42.112.22.90`

### 🔹 2. Private IP (IP nội bộ)
- Chỉ tồn tại trong mạng LAN, công ty, server nội bộ.
- Chỉ được dùng cho API nội bộ.
- Ví dụ:
  - `192.168.x.x`
  - `10.x.x.x`
  - `172.16.x.x – 172.31.x.x`

**Lưu ý cho Tester:**  
→ Khi bạn test tại nhà, bạn luôn dùng **Public IP**.

---

## 3. Vì sao API cần kiểm tra IP?

Trong dự án doanh nghiệp, nhiều API chỉ cho phép request nội bộ.

API cần kiểm tra IP để:

### ✔️ 1. Chặn truy cập trái phép từ bên ngoài
Nếu hacker hoặc người lạ gọi API từ IP ngoài → bị chặn ngay.

### ✔️ 2. Chỉ cho phép hệ thống nội bộ gọi API
Ví dụ:
- API xử lý thuế  
- API xử lý BHYT  
- API luân chuyển dữ liệu nội bộ  
- API Worker job  

### ✔️ 3. Lưu audit log để xác định nguồn request
Giúp phát hiện:
- request bất thường
- người gọi từ môi trường sai (Dev → Prod…)

---

## 4. Cách Tester kiểm tra IP của request

### 📌 Cách 1 — Xem IP qua DevTools (Website)

1. Mở website → **F12**
2. Tab **Network**
3. Chọn request API
4. Xem phần:

```
Remote Address
```

hoặc trong Header:

```
x-forwarded-for
client-ip
real-ip
```

### 📌 Cách 2 — Xem IP khi gọi Postman

Postman **không hiện IP**, nhưng API vẫn nhận public IP của máy bạn.

Bạn có thể xem IP của mình bằng:
```
https://api.ipify.org?format=json
```

### 📌 Cách 3 — Test từ VPN hoặc mạng công ty  
Nếu API yêu cầu IP private → bạn phải:
- Kết nối VPN hoặc test từ máy công ty  
- Xin thông tin địa chỉ IP từ Leader

---

## 5. Các lỗi thường gặp khi IP không hợp lệ

Khi gọi API từ IP không được phép → API thường trả:

### ❌ 403 Forbidden  
**Message mẫu:**
```
IP không được phép truy cập
```

### ❌ 401 Unauthorized  
(nếu API gộp kiểm tra token & IP)

### ❌ Không trả dữ liệu (backend chặn sớm)

---

## 6. Ghi nhớ nhanh cho Tester

- Test API luôn đi kèm kiểm tra IP.  
- Public IP → thường bị chặn ở API nội bộ.  
- Private IP → API nội bộ mới cho phép.  
- DevTools là nơi xem IP thật khi test web.  
- Postman không hiển thị IP nhưng API vẫn biết IP của bạn.  
- Muốn test IP nội bộ → phải dùng VPN.  

---


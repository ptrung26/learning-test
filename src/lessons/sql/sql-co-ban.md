# 📘 SQL Cơ bản

Tài liệu này tập trung vào **SQL nền tảng dành cho Tester** 
giúp kiểm tra API, dữ liệu backend và debug nghiệp vụ.

------------------------------------------------------------------------

## 📘 Danh mục nội dung

-   [1. SQL là gì?](#1-sql-là-gì)
-   [2. SELECT - Truy vấn dữ liệu](#2-select--truy-vấn-dữ-liệu)
-   [3. WHERE - Lọc dữ liệu](#3-where--lọc-dữ-liệu)
-   [4. LIKE - Tìm kiếm gần đúng](#4-like--tìm-kiếm-gần-đúng)
-   [5. JOIN - Nối bảng](#5-join--nối-bảng)
-   [6. GROUP BY - Tổng hợp dữ liệu](#6-group-by--tổng-hợp-dữ-liệu)
-   [7. ORDER BY - Sắp xếp dữ liệu](#7-order-by--sắp-xếp-dữ-liệu)
-   [8. LIMIT - Giới hạn kết quả](#8-limit--giới-hạn-kết-quả-mysql)
-   [9. INSERT - Thêm dữ liệu](#9-insert--thêm-dữ-liệu)
-   [10. UPDATE - Cập nhật dữ liệu](#10-update--cập-nhật-dữ-liệu)
-   [11. DELETE - Xóa dữ liệu](#11-delete--xóa-dữ-liệu)
-   [12. Kiểm thử API bằng SQL](#12-kiểm-thử-api-bằng-sql)
-   [13. SQL thường dùng cho Tester](#13-sql-thường-dùng-cho-tester)
-   [14. Lỗi thường gặp khi dùng SQL](#14-lỗi-thường-gặp-khi-dùng-sql)

------------------------------------------------------------------------

## 1. SQL là gì?

SQL (Structured Query Language) là ngôn ngữ giúp truy vấn và thao tác dữ
liệu trong database.

Tester dùng SQL để:

-   Kiểm tra dữ liệu sau khi gọi API
-   Đối chiếu Input - Output giữa FE ↔ DB
-   Kiểm tra logic nghiệp vụ (order, payment, invoice...)
-   Debug backend

------------------------------------------------------------------------

## 2. SELECT - Truy vấn dữ liệu

``` sql
SELECT id, name, email
FROM users;
```

Lấy tất cả cột:

``` sql
SELECT * FROM users;
```

------------------------------------------------------------------------

## 3. WHERE - Lọc dữ liệu

``` sql
SELECT * FROM users
WHERE status = 'active';
```

Khoảng thời gian:

``` sql
SELECT * FROM orders
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31';
```

------------------------------------------------------------------------

## 4. LIKE - Tìm kiếm gần đúng

`LIKE` được dùng khi **không biết chính xác toàn bộ giá trị**, mà chỉ
biết **một phần** (chứa, bắt đầu bằng, kết thúc bằng...).

Ví dụ cơ bản:

``` sql
SELECT * 
FROM users
WHERE fullname LIKE '%trung%';
```

Câu trên sẽ lấy **tất cả user** có `fullname` chứa từ `trung` (không
phân biệt đầu/cuối).

------------------------------------------------------------------------

### 4.1. Các mẫu LIKE thường dùng

| Pattern   | Ý nghĩa                                | Ví dụ                                                |
|-----------|-----------------------------------------|------------------------------------------------------|
| `%abc%`   | Chuỗi **có chứa** `abc` ở bất kỳ vị trí | `'%trung%'` → "Trung", "A Trung B", "TrungPT"        |
| `abc%`    | Chuỗi **bắt đầu bằng** `abc`            | `'nguyen%'` → "Nguyen Van A", "Nguyen B"             |
| `%abc`    | Chuỗi **kết thúc bằng** `abc`           | `'%gmail.com'` → email kết thúc bằng gmail.com       |
| `_`       | Đại diện cho **1 ký tự bất kỳ**         | `'t_un_'` → "tuanh", "tung1", "tuan2"...             |

> Ghi nhớ:
> - `%` → "bất kỳ chuỗi nào (0 hoặc nhiều ký tự)"
> - `_` → "đúng 1 ký tự bất kỳ"

------------------------------------------------------------------------

### 4.2. Ví dụ thực tế cho Tester

#### 🔹 Tìm user theo một phần tên

``` sql
SELECT id, fullname, email
FROM users
WHERE fullname LIKE '%anh%';
```

→ Lấy các user có tên chứa "anh": "Minh Anh", "Hoang Anh", "Thanh".

------------------------------------------------------------------------

#### 🔹 Tìm email theo domain

``` sql
SELECT id, email
FROM users
WHERE email LIKE '%@gmail.com';
```

→ Lấy toàn bộ user dùng Gmail.

------------------------------------------------------------------------

#### 🔹 Tìm số điện thoại theo đầu số

``` sql
SELECT id, phone
FROM users
WHERE phone LIKE '098%';
```

→ Lấy các số bắt đầu bằng `098`.

------------------------------------------------------------------------

#### 🔹 Tìm theo pattern cố định (dùng `_`)

``` sql
SELECT order_code
FROM orders
WHERE order_code LIKE 'HD-2024-___';
```

→ Lấy mã bắt đầu bằng `HD-2024-` và **đúng 3 ký tự phía sau**.

------------------------------------------------------------------------

### 4.3. Lưu ý quan trọng cho Tester khi dùng LIKE

-   LIKE rất hay dùng trong test case filter/search.
-   Nên kết hợp thêm điều kiện:

``` sql
SELECT * FROM users
WHERE fullname LIKE '%trung%' AND status = 'active';
```

-   `%abc%` có thể làm chậm query trên bảng lớn (nhưng UAT/Test thì chấp
    nhận được).


------------------------------------------------------------------------

## 5. JOIN - Nối bảng

``` sql
SELECT o.id, o.total_amount, u.fullname
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
```

LEFT JOIN:

``` sql
SELECT u.id, u.fullname, o.id AS order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

------------------------------------------------------------------------

## 6. GROUP BY - Tổng hợp dữ liệu

``` sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status;
```

Tổng tiền theo user:

``` sql
SELECT user_id, SUM(total_amount)
FROM orders
GROUP BY user_id;
```

------------------------------------------------------------------------

## 7. ORDER BY - Sắp xếp dữ liệu

``` sql
SELECT * FROM orders
ORDER BY created_at DESC;
```

------------------------------------------------------------------------

## 8. LIMIT - Giới hạn kết quả

``` sql
SELECT * FROM products
LIMIT 10;
```

LIMIT + OFFSET:

``` sql
SELECT * FROM products
LIMIT 10 OFFSET 20;
```

------------------------------------------------------------------------

## 9. INSERT - Thêm dữ liệu

``` sql
INSERT INTO users (fullname, email, status)
VALUES ('Nguyen Van A', 'a@gmail.com', 'active');
```

Nhiều dòng:

``` sql
INSERT INTO products (name, price)
VALUES
 ('Sua tuoi', 12000),
 ('Banh mi', 8000);
```

------------------------------------------------------------------------

## 10. UPDATE - Cập nhật dữ liệu

``` sql
UPDATE users
SET status = 'inactive'
WHERE id = 10;
```

------------------------------------------------------------------------

## 11. DELETE - Xóa dữ liệu

``` sql
DELETE FROM users
WHERE id = 5;
```

Xóa mềm (thường dùng):

``` sql
UPDATE users
SET is_deleted = 1
WHERE id = 5;
```

------------------------------------------------------------------------

## 12. Kiểm thử API bằng SQL

### Kiểm tra API tạo dữ liệu (POST):

```sql
-- INSERT dữ liệu đơn hàng mới
INSERT INTO orders (order_code, user_id, total_amount, status, created_at)
VALUES ('OD123', 10, 500000, 'NEW', NOW());
```

```sql
-- Stored Procedure chèn đơn hàng (MySQL)
DELIMITER $$

CREATE PROCEDURE InsertOrder(
    IN p_order_code VARCHAR(50),
    IN p_user_id INT,
    IN p_total_amount DECIMAL(18,2)
)
BEGIN
    INSERT INTO orders (
        order_code,
        user_id,
        total_amount,
        status,
        created_at
    )
    VALUES (
        p_order_code,
        p_user_id,
        p_total_amount,
        'NEW',
        NOW()
    );
END $$

DELIMITER ;
```

```sql
-- Gọi procedure
CALL InsertOrder('OD123', 10, 500000);
```

### Kiểm tra API cập nhật (PUT):

```sql
-- UPDATE cập nhật trạng thái đơn hàng (ví dụ chuyển sang PAID)
UPDATE orders
SET status = 'PAID',
    updated_at = NOW()
WHERE id = 100;
```

```sql
-- Stored Procedure cập nhật trạng thái đơn hàng
DELIMITER $$

CREATE PROCEDURE UpdateOrderStatus(
    IN p_id INT,
    IN p_status VARCHAR(50)
)
BEGIN
    UPDATE orders
    SET status = p_status,
        updated_at = NOW()
    WHERE id = p_id;
END $$

DELIMITER ;
```

```sql
-- Gọi procedure
CALL UpdateOrderStatus(100, 'PAID');
```

### Kiểm tra API xóa (DELETE):

```sql
-- XÓA MỀM (Soft Delete) – rất phổ biến trong hệ thống thực tế
UPDATE products
SET is_deleted = 1,
    deleted_at = NOW()
WHERE id = 88;
```

```sql
-- Stored Procedure soft delete sản phẩm (MySQL)
DELIMITER $$

CREATE PROCEDURE SoftDeleteProduct(
    IN p_id INT
)
BEGIN
    UPDATE products
    SET is_deleted = 1,
        deleted_at = NOW()
    WHERE id = p_id;
END $$

DELIMITER ;
```

```sql
-- Gọi procedure soft delete
CALL SoftDeleteProduct(88);
```

---

```sql
-- XÓA CỨNG (Hard Delete) – cẩn thận khi dùng
DELETE FROM products
WHERE id = 88;
```

```sql
-- Stored Procedure hard delete sản phẩm
DELIMITER $$

CREATE PROCEDURE HardDeleteProduct(
    IN p_id INT
)
BEGIN
    DELETE FROM products
    WHERE id = p_id;
END $$

DELIMITER ;
```

```sql
-- Gọi procedure hard delete
CALL HardDeleteProduct(88);
```

------------------------------------------------------------------------

## 13. SQL thường dùng cho Tester

### Lấy log mới nhất:

``` sql
SELECT * FROM activity_log
ORDER BY created_at DESC
LIMIT 20;
```

### Kiểm tra trùng:

``` sql
SELECT COUNT(*) FROM users
WHERE email = 'abc@gmail.com';
```

------------------------------------------------------------------------

## 14. Lỗi thường gặp khi dùng SQL

-   Dùng `SELECT *` quá nhiều
-   JOIN thiếu điều kiện → duplicate record
-   Không ORDER BY → dữ liệu không ổn định
-   WHERE sai kiểu dữ liệu `'10'` vs `10`
-   Quên WHERE khi UPDATE/DELETE
-   Sai BETWEEN ngày giờ
-   LIKE dùng sai pattern

------------------------------------------------------------------------

# 🎯 Kết luận

Đây là tài liệu SQL chuẩn dành cho Tester, dùng để kiểm
thử API và nghiệp vụ backend.

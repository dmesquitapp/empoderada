USE Empoderada;

CREATE TABLE IF NOT EXISTS Users (
    email varchar(200) not null primary key,
    is_active boolean not null default true,
    created_date datetime not null default current_timestamp,
    name varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null,
    password varchar(200) not null,
    level varchar(50) not null default "customer" -- customer or admin
);

CREATE TABLE IF NOT EXISTS Address (
    id int(10) auto_increment primary key,
    zipcode char(10),
    address_number varchar(50),
    complement varchar(50),
    user varchar(200) not null,
    FOREIGN KEY (user) REFERENCES Users(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Orders (
    id int(10) auto_increment primary key,
    user varchar(200) not null,
    order_date datetime not null,
    status varchar(50) not null,  -- pending, approved, shipped, delivered
    shipment_date datetime,       -- when the product was sent to customer
    delivery_date datetime,        -- when the product was delivered to customer
    payment_method varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null, --  credit card, cash on hand, pix, etc.
    address varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    FOREIGN KEY (user) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS Products (
    id int(10) AUTO_INCREMENT PRIMARY KEY,
    sku varchar(36) UNIQUE KEY,
    image_url text,
    name varchar(255) NOT NULL,
    description text,
    stock int(10) UNSIGNED NOT NULL,
    price decimal(10,2) NOT NULL
    );

CREATE TABLE IF NOT EXISTS OrderItems (
    item_id int(10) auto_increment PRIMARY KEY,
    order_id int NOT NULL,
    product_sku varchar(36) not null,
    product_name varchar(255) NOT NULL,
    quantity int NOT NULL,
    price decimal(10,2) NOT NULL,   -- with two digits after the comma
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_sku) REFERENCES Products(sku) ON DELETE CASCADE
);



INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP001', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 1', 'This is product 1 description.', 100, 19.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP002', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 2', 'This is product 2 description.', 50, 29.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP003', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 3', 'This is product 3 description.', 75, 39.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP004', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 4', 'This is product 4 description.', 25, 49.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP005', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 5', 'This is product 5 description.', 10, 59.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP006', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 6', 'This is product 6 description.', 30, 9.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP007', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 7', 'This is product 7 description.', 40, 19.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP008', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 8', 'This is product 8 description.', 60, 29.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP009', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 9', 'This is product 9 description.', 80, 39.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP010', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 10', 'This is product 10 description.', 90, 49.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP011', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 11', 'This is product 11 description.', 20, 59.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP012', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 12', 'This is product 12 description.', 30, 9.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP013', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 13', 'This is product 13 description.', 40, 19.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP014', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 14', 'This is product 14 description.', 50, 29.99);
INSERT INTO Products (sku, image_url, name, description, stock, price) VALUES ('EMP015', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'Product 15', 'This is product 15 description', 70, 39.99);

DELIMITER //
CREATE TRIGGER update_stock_after_sale
    AFTER INSERT ON OrderItems
    FOR EACH ROW
BEGIN
    UPDATE Products
    SET stock = stock - NEW.quantity
    WHERE sku = NEW.product_sku;
END;
//
DELIMITER ;

sql
Download
Copy code
DELIMITER //
CREATE TRIGGER check_stock_before_sale
    BEFORE INSERT ON OrderItems
    FOR EACH ROW
BEGIN
    DECLARE stock_available INT;
    SELECT stock INTO stock_available FROM Products WHERE sku = NEW.product_sku;
    IF stock_available < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock for product: ' + NEW.product_sku;
END IF;
END;
//
DELIMITER ;

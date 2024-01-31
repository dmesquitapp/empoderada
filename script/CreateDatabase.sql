USE Empoderada;

CREATE TABLE IF NOT EXISTS Users (
    email varchar(200) not null primary key,
    is_active boolean not null default true,
    created_date datetime not null default current_timestamp,
    name varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null,
    password varchar(200) not null
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
    id int(10) primary key,
    user varchar(200) not null,
    order_date datetime not null,
    status varchar(50) not null,  -- pending, approved, shipped, delivered
    shipment_date datetime,       -- when the product was sent to customer
    delivery_date datetime,        -- when the product was delivered to customer
    payment_method varchar(100) not null, --  credit card, cash on hand, pix, etc.
    address varchar(200),
    FOREIGN KEY (user) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS OrderItems (
    item_id serial PRIMARY KEY,
    order_id int NOT NULL,
    product_name varchar(255) NOT NULL,
    quantity int NOT NULL,
    price decimal(10,2) NOT NULL,   -- with two digits after the comma
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Products (
    id int AUTO_INCREMENT PRIMARY KEY,
    sku varchar(36) UNIQUE KEY,
    image_url text,
    name varchar(255) NOT NULL,
    description text,
    stock int(10) UNSIGNED NOT NULL,
    price decimal(10,2) NOT NULL     -- same as in OrderItems
);
    

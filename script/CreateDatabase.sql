USE Empoderada;

CREATE TABLE Users (
    email varchar(200) not null primary key,
    is_active boolean not null default true,
    created_date datetime not null default current_timestamp,
    name varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null,
    password varchar(200) not null,
    zipcode char(10),
    address_number varchar(50),
    complement varchar(50)
);
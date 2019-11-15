DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(50) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (101, "boots", "ski", 279.99, 30),
	   (212, "winter", "jacket", 99.99, 45),
	   (313, "helmet", "ski", 69.99, 10),
	   (420, "sweater", "ski", 29.99, 14),
	   (504, "snow pants", "mountain wear", 79.99, 15),
	   (619, "long johns", "mountain wear", 39.99, 19),
	   (720, "gloves", "snow", 49.99, 21),
	   (808, "pole", "ski", 19.99, 17),
	   (913, "skis", "ski", 899.99, 20),
	   (1009, "socks", "mountain wear", 19.99, 13)
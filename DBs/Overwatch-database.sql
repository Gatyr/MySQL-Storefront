CREATE DATABASE regular_db;

USE regular_db;

CREATE TABLE Overwatch(
id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department VARCHAR(50) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Blackwatch Genji", "skins", 1000, 250);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("D.Va Pixel Spray", "sprays", 25, 10000);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Tracer Charleston Dance", "emotes", 750, 500);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Genji 'Not enough' voice line", "voice_lines", 25, 10000);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Reinhardt Baratheon", "skins", 3000, 10);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Mercy Dragon Queen", "skins", 250, 1000);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Junkrat Anniversery Icon", "icons", 25, 10000);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Roadhog Can-crusher", "emotes", 250, 1000);

INSERT INTO Overwatch (product_name, department, price, stock_quantity)
VALUES ("Ana Gold Icon", "icons", 25, 10000);
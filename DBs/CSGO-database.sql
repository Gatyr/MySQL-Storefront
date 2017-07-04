USE regular_db;

CREATE TABLE CSGO_skins(
id INTEGER(10) AUTO_INCREMENT NOT NULL,
name VARCHAR(50) NOT NULL, 
price INTEGER(50) NOT NULL,
rarity VARCHAR(50) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("AWP Asimov", 1000, "red", 250);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("AK-47 Red Laminate", 250, "purple", 1000);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("P-2000 Granite Marbleized", 25, "silver", 10000);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("Tec-9 Groundwater", 25, "silver", 10000);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("Scar-20 Contractor", 25, "silver", 10000);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("M4-A4 Howl", 3000, "legendary", 10);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("SSG-08 Big Iron", 750, "fuschia", 500);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("P250 Wingshot", 250, "purple", 1000);

INSERT INTO CSGO_skins(name, price, rarity, stock_quantity)
VALUES("M9 Bayonet Damascus Steel", 1000, "red", 250);
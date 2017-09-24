USE regular_db;

CREATE TABLE UsersAccounts(
id INTEGER(10) AUTO_INCREMENT NOT NULL,
name VARCHAR(20) NOT NULL,
budget INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO UsersAccounts(name, budget)
VALUES ("Danny", 10000);

INSERT INTO UsersAccounts(name, budget)
VALUES ("Andrew", 7500);

INSERT INTO UsersAccounts(name, budget)
VALUES ("Josh", 15000);

INSERT INTO UsersAccounts(name, budget)
VALUES ("Ryan", 1000);

INSERT INTO UsersAccounts(name, budget)
VALUES ("Store", 200000);
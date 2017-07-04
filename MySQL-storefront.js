var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",

	database: "regular_db"
});

connection.connect(function(err, res) {
	if (err) throw err;
	console.log("connected as id: " + connection.threadId);
});

var showItems = function(productTable) {
	if (productTable === "Overwatch"){
		connection.query("SELECT * FROM Overwatch", function(err, res) {
			//console.log("Overwatch Items: ");
			console.log("\n");
			for (var i = 0; i < res.length; i++) {
				console.log("ID: " + res[i].id + " || Item name: " + res[i].product_name + " || Department: " + res[i].department + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
			}
			console.log("---------------------------------------------------------------")
		});
	}
	else if (productTable === "CSGO_skins2") {
		connection.query("SELECT * FROM CSGO_skins2", function(err, res) {
			//console.log("CSGO Skins: ");
			console.log("\n");
			for (var i = 0; i < res.length; i++) {
				console.log("ID: " + res[i].id + " || Name: " + res[i].name_of_skin + " || Price: " + res[i].price + " || Rarity: " + res[i].rarity + " || Quantity: " + res[i].stock_quantity);
			}
			console.log("---------------------------------------------------------------")
		});
	}
}

var determinePersonel = function() {
	inquirer.prompt({
		name: "person",
		type: "rawlist", 
		message: "Are you a customer or the store manager?",
		choices: [
		"Customer",
		"Store manager"
		]	
	}).then(function(answer) {
		switch(answer.person) {
			case "Customer":
				//customerPurchase();
				inquirer.prompt({
					name: "table",
					type: "rawlist",
					message: "Which game would you like to purchase items for?",
					choices: [
					"Overwatch",
					"CS:GO"]
				}).then(function(answer2) {
					customerPurchase(answer2.table);
				})
				break;
			case "Store manager":
				//ru function for store manager
				break;
		}
	});
};

var customerPurchase = function(productTable) {
	console.log("Let us show you what we have in stock: ");
	showItems(productTable);
	buyItem(productTable);
}

var buyItem = function(productTable) {
	inquirer.prompt({
		name: "item",
		type: "input", 
		message: "What is the item number of the product you would like to buy?"
	}).then(function(answer) {
		var itemNumber = answer.item;
		inquirer.prompt({
			name: "quantity",
			type: "input",
			message: "How many of this item would you like to buy?"
		}).then(function(answ) {
			//console.log("Okay...it looks like you want to buy " + answ.quantity + " units of item number: " + itemNumber);
			SQLfunction(itemNumber, answ.quantity, productTable);
		});
	});
}

//determinePersonel();

//take item number as ID, answ quantity as number to buy, and table for table query

var SQLfunction = function(id, quantity, table) {
	connection.query("SELECT * FROM " + table + " WHERE id=" + id, function(err, res) {
		var initialQuantity = res[0].stock_quantity;
		var newQuant = initialQuantity - quantity;
		connection.query("UPDATE " + table + " SET stock_quantity=" + newQuant + " WHERE id=" + id, function(err, res) {

		});
		console.log("This purchase costed you $" + (quantity * res[0].price) + ", and our stock quantity has been updated");
	});

	
}

var testFunction = function() {
	connection.query("SELECT * FROM CSGO_skins2 WHERE id=1", function(err, res) {
		var test = res[0].stock_quantity;
		var newQuant = 1000 - test;
		connection.query("UPDATE CSGO_skins2 SET stock_quantity=" + newQuant + " WHERE id=1", function(err, res) {
			console.log(res);
		})
	})
	
}

determinePersonel();
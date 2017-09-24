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
	//console.log("connected as id: " + connection.threadId);
})


var determinePersonel = function() {
	var user;
	var names = ['Danny', 'Andrew', 'Josh', 'Ryan'];
	inquirer.prompt({
		name: "person",
		type: "input", 
		message: "Who are you signing in as?"
	}).then((answer) => {
		//console.log(answer.person);
		user = answer.person;
		if (names.includes(user)) {
			console.log('\n');
			console.log("Thank you for signing in, " + user);
			accessUserData(user);
		} else {
			console.log("Sorry, your login name is not recognized.")
			console.log("Release the hounds.");
		}
	});
}


var accessUserData = function(user) {
	connection.query("SELECT * FROM UsersAccounts WHERE name='" + user + "'", function(err, res) {
		console.log('\n');
		console.log("You have $" + res[0].budget + " to spend");
		determineTable(user);
	});
}

var determineTable = function(user) {
	inquirer.prompt({
		name: "table",
		type: "rawlist",
		message: "Which game would you like to purchase items for?",
		choices: [
		"Overwatch",
		"CS:GO"]
	}).then(function(answer2) {
		if (answer2.table === "CS:GO") {
			//customerPurchase("CSGO_skins2");
			console.log("\n");
			console.log("Pulling up our CS:GO selection...");
			showItems("CSGO", user);
		} else {
			//customerPurchase(answer2.table);
			console.log("\n");
			console.log("Pulling up our Overwatch selection...");
			showItems("Overwatch", user);
		}
	});
}

var showItems = function(productTable, user) {
	console.log('\n');
	if (productTable === "Overwatch"){
		connection.query("SELECT * FROM Overwatch", function(err, res) {
			//console.log("Overwatch Items: ");
			console.log("\n");
			for (var i = 0; i < res.length; i++) {
				console.log("ID: " + res[i].id + " || Item name: " + res[i].name_of_item + " || Department: " + res[i].department + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
				console.log("---------------------------------------------------------------")
			}
			
		});
		buyItem("Overwatch", user);
	}
	else if (productTable === "CSGO") {
		connection.query("SELECT * FROM CSGO_skins2", function(err, res) {
			//console.log("CSGO Skins: ");
			console.log("\n");
			for (var i = 0; i < res.length; i++) {
				console.log("ID: " + res[i].id + " || Name: " + res[i].name_of_item + " || Price: " + res[i].price + " || Rarity: " + res[i].rarity + " || Quantity: " + res[i].stock_quantity);
				console.log("---------------------------------------------------------------")
			}
		});
		buyItem("CSGO", user);
	}
}

var buyItem = function(productTable, user) {
	inquirer.prompt({
		name: "item",
		type: "input", 
		message: "What is the item number of the product you would like to buy?"
	}).then(function(answer) {
		console.log('\n');
		var itemNumber = answer.item;
		inquirer.prompt({
			name: "quantity",
			type: "input",
			message: "How many of this item would you like to buy?"
		}).then(function(answ) {
			console.log('\n');
			SQLfunction(itemNumber, answ.quantity, productTable, user);
		});
	});
}

var SQLfunction = function(id, quantity, table, user) {
	connection.query("SELECT * FROM " + table + " WHERE id=" + id, function(err, res) {
		var initialQuantity = res[0].stock_quantity;
		var newQuant = initialQuantity - quantity;
		var cost = quantity * res[0].price
		var itemName = res[0].name_of_item;	
		connection.query("UPDATE " + table + " SET stock_quantity=" + newQuant + " WHERE id=" + id, function(err, res) {

		});
		console.log("This purchase costed you $" + cost + ", and our stock quantity has been updated:");
		console.log("\n");
		connection.query("SELECT * FROM " + table + " WHERE id=" + id, function(error, response) {
			if (table === "Overwatch") {
				console.log("ID: " + response[0].id + " || Item name: " + response[0].name_of_item + " || Department: " + response[0].department + " || Price: " + response[0].price + " || Quantity: " + response[0].stock_quantity);
				console.log("---------------------------------------------------------------")
			} else {
				console.log("ID: " + response[0].id + " || Name: " + response[0].name_of_item + " || Price: " + response[0].price + " || Rarity: " + response[0].rarity + " || Quantity: " + response[0].stock_quantity);
				console.log("---------------------------------------------------------------")
			}
		});
		transaction(user, quantity * res[0].price);
		addToUserInventory(user, itemName, quantity, cost);
	});
	
}

var transaction = function(user, amount) {
	connection.query("SELECT * FROM UsersAccounts WHERE name='" + user + "'", function(err, res) {
		var budget = res[0].budget;
		var cost = amount;
		var id = res[0].id;
		var newBudget = budget - cost;
		connection.query("UPDATE UsersAccounts SET budget=" + newBudget + " WHERE id=" + id, function(error, response) {
			console.log('\n');
			console.log("You now have $" + newBudget + " to spend.");
		});
	});
	connection.query("SELECT * FROM UsersAccounts WHERE id=5", function(err, res) {
		var storeBudget = res[0].budget;
		var newStoreBudget = amount + storeBudget;
		connection.query("UPDATE UsersAccounts SET budget=" + newStoreBudget + " WHERE id=5", function(error, res) {
		});
	});
}

var addToUserInventory = function(user, item, quantity, budget) {
	connection.query("SELECT * FROM danny", function(err, res) {
		connection.query("INSERT INTO " + user + " (name, quantity, budget) VALUES ('" + item + "', " + quantity + ", " + budget + ")", function(error, response) {			
			displayUserInventory(user);
		});
	});

}

var displayUserInventory = function(user) {
	connection.query("SELECT * FROM " + user, function(err, res) {
		console.log('\n');
		console.log(user + "'s Inventory: ")
		console.log('\n');
		for (var i = 0; i<res.length; i++) {
			console.log("Item Name: " + res[i].name + " | Quantity: " + res[i].quantity + " | Cost for items: " + res[i].budget);
			console.log("----------------------------------------------------------------------");
		}
	})
}
determinePersonel();

//to do: at end of transaction function, run function to display users table with all info
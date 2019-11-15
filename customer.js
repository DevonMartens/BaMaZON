//requirements for node
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
//connection -use port local host
//sql
//password always docker
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"docker",
	database:"bamazon"
});
// if error
connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});
// display product to customer use mysql
var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}
//customer purchase
function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter the item ID of the item you wish to purchase today.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many of this item would you like to purchase today?",
		filter:Number
	},
//id and quauntity
//answers for customer input 
 ]).then(function(answers){
 	var orderQuantity = answers.Quantity;
 	var IDrequested = answers.ID;
 	reciept(IDrequested, orderQuantity);
 });
};
//purchas
function reciept(ID, amountOrdered){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
    //error 
        if(err){console.log(err)};
		if(amountOrdered <= res[0].stock_quantity){
			var totalCost = res[0].price * amountOrdered;
			console.log("Your items are available and ready for purchase. Thank you for chooseing BaMaZon.");
			console.log("Your total today will be " + amountOrdered + " " +res[0].product_name + " is " + totalCost + " Thank you!");
 // more items than available for purchase
			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amountOrdered + " WHERE item_id = " + ID);
		} else{
			console.log("We are sorry to inform you but BaMaZon is does not have the quantity of product you are attempting to order today." + res[0].product_name + "We apologize for the inconvience.");
		};
		displayProducts();
	});
};

displayProducts(); 
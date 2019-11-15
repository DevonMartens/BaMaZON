//requirements for node
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
//same connect
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"docker",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

function displayInventory(){
	connection.query('SELECT * FROM products', function(err, res){
		if(err){console.log(err)};
		var theDisplayTable = new Table({
			head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
			colWidths: [10,25,25,10,14]
		});
		for(i=0; i<res.length;i++){
			theDisplayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
        }
//push to string
		console.log(theDisplayTable.toString());
		updateFunction();
	});
};
//manger update functions

function updateFunction(){
	inquirer.prompt([{
		name:"action",
		type: "list",
		message: "The options below are for manager updates to inventory:",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
	}]).then(function(answers){
		switch(answers.action){
			case 'Restock Inventory':
				managerRestock();
				break;
			case 'Add New Product':
				NewInventory();
				break;
			case 'Remove An Existing Product':
				managerRemove();
				break;		
		}
	});
};
//restock request
function managerRestock(){
	inquirer.prompt([
	{
		name:"ID",
		type:"input",
		message:"Please enter the item number of the item you would like to restock:"
	},
	{
		name:"Quantity",
		type:"input",
		message:"Enter the quantity"
	},
	]).then(function(answers){
		var quantityAdd = answers.Quantity;
		var ProductID = answers.ID;
		managerRestock(productID, quantityAdd);
	});
};

function managerRestock(id, quant){
	connection.query('SELECT * FROM Products WHERE item_id = '+id, function(err,res){
		if(err){console.log(err)};
		connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' +stock_quantity+ 'WHERE item_id =' +item_id);

		displayInventory();
	});
};

function NewInventory(){
	inquirer.prompt([

	{
		name: "ID",
		type: "input",
		message: "Add ID Number"

	},	
	{
		name: "Name",
		type: "input",
		message: "Add new product name"
	},
	{
		name:"Category",
		type:"input",
		message:"Add product category"
	},
	{
		name:"Price",
		type:"input",
		message:"Add product price"
	},
	{
		name:"Quantity",
		type:"input",
		message:"Add product quantity available for sale"
	},

	]).then(function(answers){
		var id = answers.Id;
		var name = answers.Name;
		var category = answers.Category;
		var price = answers.Price;
		var quantity = answers.Quantity;
        newItemConstruct(id,name,category,price,quantity); 
	});
  };

  function newItemConstruct(name,category,price,quantity){
	var id = answers.ID;
  	connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity +  ')');
  	displayInventory();
  };

  function managerRemove(){
  	inquirer.prompt([{
  		name:"ID",
  		type:"input",
  		message:"What is the item number of the item you would like to remove?"
  	}]).then(function(answer){
  		var id = answers.ID;
  		managerRemove(id); 
  	});
  };

  function managerRemove(id){
	connection.query('DELETE FROM Products WHERE item_id = ' + id);
	displayInventory();
};

displayInventory();
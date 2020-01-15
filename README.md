# BaMaZON
A node and mySQL app.

Github link:
https://devonmartens.github.io/BaMaZON/

The database used for this repository is a MySQL Database called bamazon.


The Table inside of that database called products contains the following information about each product, item_id (unique number id for each product), product_name (Name of product), department_name (department that the product is under), price (cost to customer), and stock_quantity (how much of the product is available in stores)/


The Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Including the ids, names, and prices of products for sale.


The Node app prompts users with two messages.

The first, asks them the ID of the product they would like to buy. The second,message asks how many units of the product they would like to buy.

Once the customer has placed the order, the application checks if your store has enough of the product to meet the customer's request. If the store does notnot, the app has a phrase logged indicating the insufficient quantity!, and this prevents the order from going through. If the  store does have enough of the product, the order is fulfilled for the customer. 

As a result the SQL database is updated reflect the remaining quantity. Once the update goes through, the customer is shown the total cost of their purchase.



The  Manager View is a second Node application called bamazonManager.js. Running this application will:


-List a set of menu options:
-View Products for Sale
-View Low Inventory
-Add to Inventory
-Add New Product

What these prompts do:
If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities. If a manager selects View Low Inventory, then a list all items with an inventory count lower than five.
If a manager selects Add to Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store.If a manager selects Add New Product, it allows the manager to add a completely new product to the store.



Key topics covered in unit 11 and this homework:
MySQL Workbench
MySQL command prompt
Creating and dropping databases and tables
schema.sql and seeds.sql files
CRUD
Primary and foreign keys
Prepared statements
Joins
ACID

const mysql = require("mysql");

// Connect to Database
const connection = mysql.createConnection({
    host: "159.223.77.38",
    user: "root",
    password: "10gXWOqeaf",
    database: "Matrix",
});
  
connection.connect((e) => {
    if (e) throw e;
    console.log("Node JS Successfully Connected to MYSQl DataBase !!!");
});
  
module.exports = connection

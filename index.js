var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeTrackDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  inquirer
    .prompt([{
        type: "list",
        name: "first",
        message: "What would you like to do?",
        choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee roles"]
    }]).then(function({first}){
        if(first === "Add department"){
            addDep();
        }
        else if(first === "Add role"){
            addRole();
        }
        else if(first === "Add employee"){
            addEmployee();
        }
        else if(first === "View roles"){
            viewRoles();
        }
        else if(first === "View departments"){
            viewDep();
        }
        else if(first === "View employees"){
            viewEmployee();
        }
        else if(first === "Update employee roles"){
            updateRole();
        }

    })
});

function addDep() {
    inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        }]).then(function({name}){
            var query = connection.query(
                "INSERT INTO department SET ?",
                {
                  name: name,
                },
                function(err, res) {
                  console.log(res.affectedRows + " department inserted!\n");
                }
              );
        })
  }
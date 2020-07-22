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
    start();
});

async function start(){
    inquirer
        .prompt([{
            type: "list",
            name: "first",
            message: "What would you like to do?",
            choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee roles"]
        }]).then(await function({first}){
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
}

async function addDep() {
    await inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        }]).then(function({name}){
            connection.query(
                "INSERT INTO department SET ?",
                {
                  name: name,
                },
                function(err, res) {
                    if(err) return err;
                    console.log(res.affectedRows + " department inserted!\n");
                    start();
                }
              );
        })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
    inquirer
        .prompt([{
            type: "input",
            name: "newTitle",
            message: "What is the title of this role?"
        },{
            type: "input",
            name: "newSalary",
            message: "What is the salary associated with this role?"
        },{
            name: "id",
            type: "rawlist",
            choices: function() {
                var dep = [];
                for( var i=0; i<res.length; i ++){
                    dep.push(res[i].name)
                }
                return dep;
            },
            message: "What department is this role associated with?"
        }]).then(function({newTitle,  newSalary, id}){
            console.log("done");
            var corDep;
            for(var i=0; i<res.length; i++){
                if(id === res[i].name){
                    corDep = res[i].id;
                }
            }
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: newTitle,
                    salary: newSalary,
                    department_id: corDep
                },
                function(err, res) {
                    if(err) throw err;
                    console.log(res.affectedRows + " Role inserted!\n");
                    start();
                }
            );
        })
    });
}

async function addEmployee() {
    var roles = [];
    var employees = [];
    var fullEmployee;
    var fullRoles;
    await connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            if(res[i].title){
                roles.push(res[i].title);
            }
        }
        fullRoles = res;
    });

    await connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            employees.push(res[i].first_name + " " + res[i].last_name);
        }
        fullEmployee = res;
    });
    
    inquirer
        .prompt([{
            type: "input",
            name: "firstName",
            message: "What is first name of this employee?"
        },{
            type: "input",
            name: "lastName",
            message: "What is the last name of this employee?"
        },{
            type: "rawlist",
            name: "role_id",
            message: "What role does this employee have?",
            choices: roles
        },{
            type: "rawlist",
            name: "manager_id",
            message: "Who is the manager of this employee?",
            choices: employees
        }]).then(function({firstName, lastName, role_id, manager_id}){
        var corRol;
        for(var i=0; i<fullRoles.length; i++){
            if(role_id === fullRoles[i].title){
                corRol = fullRoles[i].id;
            }
        }
        var corEmp;
        for(var i=0; i<fullEmployee.length; i++){
            if(manager_id === (fullEmployee[i].first_name + " " + fullEmployee[i].last_name)){
                corEmp = fullEmployee[i].id;
                if(fullEmployee[i].name === "None"){
                    corEmp = null;
                }
            }
        }
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: corRol,
                manager_id: corEmp,

            },
            function(err, res) {
                if(err) throw err;
                console.log(res.affectedRows + " Role inserted!\n");
                start();
            }
        );
        })
}

function viewRoles(){
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            console.log("ID: " + res[i].id + "\n")
            console.log("Title: " + res[i].title + "\n")
            console.log("Salary: " + res[i].salary + "\n")
            console.log("Department ID: " + res[i].department_id + "\n")
            console.log("--------------")
        }
        start();
    })
}

function viewDep(){
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            console.log("ID: " + res[i].id + "\n")
            console.log("Name: " + res[i].name + "\n")
            console.log("--------------")
        }
        start();
    })
}

function viewEmployee(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            console.log("ID: " + res[i].id + "\n")
            console.log("Firstname: " + res[i].first_name + "\n")
            console.log("Lastname: " + res[i].last_name + "\n")
            console.log("Role ID: " + res[i].role_id + "\n")
            console.log("Manager ID: " + res[i].manager_id + "\n")
            console.log("--------------")
        }
        start();
    })
}

async function updateRole(){
    var roles = [];
    var employees = [];
    var fullEmployee;
    var fullRoles;
    await connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            if(res[i].title){
                roles.push(res[i].title);
            }
        }
        fullRoles = res;
    });
    await connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            employees.push(res[i].first_name + " " + res[i].last_name);
        }
        fullEmployee = res;

    inquirer
        .prompt([{
            type: "rawlist",
            name: "name",
            message: "Who is the employee you would like to update?",
            choices: employees
        },{
            type: "rawlist",
            name: "role",
            message: "What is the new role this employee has?",
            choices: roles
        }]).then(function({name, role}){
            var corEmp;
            for(var i=0; i<fullEmployee.length; i++){
                if(name === (fullEmployee[i].first_name + " " + fullEmployee[i].last_name)){
                    corEmp = fullEmployee[i].id;
                }
            }
            var corRol;
            for(var i=0; i<fullRoles.length; i++){
                if(role === fullRoles[i].title){
                    corRol = fullRoles[i].id;
                }
            }
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    id: corEmp
                  },
                  {
                    role_id: corRol
                  }
                ],
                function(err, res) {
                  console.log(res.affectedRows + " employees updated!\n");
                    start();
                }
              );
        })
    });
}
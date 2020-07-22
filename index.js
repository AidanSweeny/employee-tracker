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

async function addRole() {
    var departments = [];
    var fullDepartments;
    await connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            departments.push(res[i].name);
        }
        fullDepartments = res;
    });
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
            type: "rawlist",
            name: "id",
            message: "What department is this role associated with?",
            choices: departments
        }]).then(function({newTitle,  newSalary, id}){
        var corDep;
        for(var i=0; i<fullDepartments.length; i++){
            if(id === fullDepartments[i].name){
                corDep = fullDepartments[i].id;
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
            if(role_id === fullRoles[i].name){
                corRol = fullRoles[i].id;
            }
        }
        var corEmp;
        for(var i=0; i<fullEmployee.length; i++){
            if(manager_id === fullEmployee[i].name){
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
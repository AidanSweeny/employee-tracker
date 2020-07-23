# employee-tracker
For this project I created a terminal run application that, through SQL, created tables that could be access and edited for employee management. I started by creating the tables using the SQL workbench, and made an employee, role, and a department table. These tables held different data depending on their necessity. I then created different methods so that I could add, delete, and update data from the different tables. The finished product was able to add and delete employees, departments, and roles, as well as update roles, and view all of them. I used inquirer to display different prompts to the user in order to gather information. I used the mysql package in order to connect to the SQL workbench so that I could work with the tables that I had created there. An example of one of the connections I made was as follows:

```
connection.query( "UPDATE employee SET ? WHERE ?",[{id: corEmp},{role_id: corRol}]
```
This code snippet was used in the update method that I created, where I could edit the employee's roles.  This code updates the employee with an id of corEmp, and then sets the role_id of that employee to corRol. The cor variables I set to the proper id's of the role and employee that I needed. I also added some user validation in this project for the salary, to make sure that the user entered a valid number.  Below is a video of the working application:

![](tracker.gif)

This gif shows the functionality of the  application in that it can make departments, roles, and employees. It also shows the functionality of updating the table.

## Getting Started

To get this project running, one must copy the files from the class repository, and run an `npm install` on the correct directory. One could also just view it using the deployed link.

### Prerequisites

To have this project run, one must download VS Code off the appstore, and create a GitHub account. Git is also required to run this program, which can be downloaded 

```
$ brew install git. 
```
Homebrew can also be downloaded by inputting the following command in the terminal:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Installing

To install this project one must go through the GitHub website in order to clone this project. Clicking on the cone or download button and then copying the link that comes from that. One can then go into the Terminal application, and use the following command to copy the files:
`
git clone URL
`
This should then be moved to your desktop, or somewhere else on your computer. This will allow access to the html and css files. Opening the html file in a default browser will allow one to observe the website.

## Built With

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [SQL](https://dev.mysql.com/doc/)
* [Node.js](https://nodejs.org/en/docs/)

## Deployed Link

* [See Live Site](https://mysterious-sands-92673.herokuapp.com/)

## Authors

* Aidan Sweeny

- [Link to Github](https://github.com/AidanSweeny)
- [Link to LinkedIn](https://www.linkedin.com/in/aidan-sweeny-81075030/)

## License

This project is licensed under the MIT License 

## Acknowledgments

* Berkley Coding Bootcamp




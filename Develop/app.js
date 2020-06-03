const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//const util = require("util");  


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray =[];


function rerun () {
    inquirer.prompt ([
    {
    type: "list",
    message: "Would you like to add another employee",
    choices: ["Yes", "No"],
    name: "another",
    }
    ])
.then(function (answer) {
    if (answer.another === "Yes") {
        addEmployee()
    } else {
            var createHTML = render(employeeArray)
            console.log(createHTML);
            fs.writeFile(outputPath, createHTML, function(err) {
            
            if (err) {
              return console.log(err);
            }
          
            console.log("Success!");
          
          })}})};

function addEmployee () {
    inquirer.prompt([
        {
            type: "input",
            message: "Employee Name",
            name: "name"
        },

        {
            type: "input",
            message: "Employee Email",
            name: "email"
        },

        {
            type: "input",
            message: "Employee ID",
            name: "id"
        },

        {
            type: "list",
            message: "Employee Role",
            choices: ["Manager", "Engineer", "Intern"],
            name: "role",
            default: "Engineer"
        },
        ])
    .then (function (answers) {
        if (answers.role === "Engineer") {
            inquirer.prompt ([
                {
                type: "input",
                message: "Enter Github User Name",
                name: "github",
                }])
                .then ((answer) => {
                    console.log(answer);
                    const engineer = new Engineer (answers.name, answers.email, answers.id, answer.github)
                    employeeArray.push(engineer);
                    rerun()
                    //console.log(employeeArray);
                })
            } else if (answers.role === "Intern") {
                inquirer.prompt ([
                    {
                    type: "input",
                    message: "Where are you going to school",
                    name: "school",
                }])
                .then ((answer) => {
                    const intern = new Intern (answers.name, answers.email, answers.id, answer.school)

                    employeeArray.push(intern);
                    rerun()
                    ///console.log(employeeArray);
                })
            } else if (answers.role === "Manager") {
                inquirer.prompt ([
                    {
                    type: "input",
                    message: "Enter office phone number",
                    name: "officeNumber",
                }])
                .then ((answer) => {
                    const manager = new Manager (answers.name, answers.email, answers.id, answer.officeNumber, answers.role,)

                    employeeArray.push(manager);
                    rerun()
                    //console.log(employeeArray);
                })
                    };
                    
                })
                
            };


            addEmployee ();
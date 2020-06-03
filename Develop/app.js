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
            (createHTML) => {fs.appendFile(outputPath, createHTML, function(err) {
            
            if (err) {
              return console.log(err);
            }
          
            console.log("Success!");
          
          })}}})};

//1. ask for name, email, role

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
                    console.log(employeeArray);
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
                    console.log(employeeArray);
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
                    console.log(employeeArray);
                })
                    };
                    
                })
                
            };


            addEmployee ();

           

//if role == intern
    //ask for school
    //ask if there is another employee? yes or no
        //create intern passing in name email role and school
        //then stuff the intern into the employeearray
            //if yes
                //ask for name email and role
            //if no 
                //create template (html render)
                //create html file team.html


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

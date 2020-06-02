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

//const writeFileAsync = util.promisify(fs.writeFile);

const employeeArray =[];
 
function init () {
     addEmployee();
     baseHTML();
};
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
        },
        ])
    .then (function ({name, email, id, role}) {
        let roleType = "";
        if (role === "Engineer") {
            roleType = "GitHub username";
            } else if (role === "Intern") {
                roleType = "school name";
            } else {
                roleType = "office phone number";
            };
            inquirer.prompt ([
                {
                type: "input",
                message: `Enter ${"roleType"}`,
                name: "roleType",
                },
                {
                type: "checkbox",
                message: "Would you like to add another employee",
                choices: ["Yes", "No"],
                name: "another",
                }, 
            ])
                .then (function ({roleType, another}) {
                    let newEmployee;
                    if (role === "Engineer") {
                        newEmployee = new Engineer (name, email, id, roleType);
                    }
                    else if (role === "Intern") {
                        newEmployee = new Intern (name, email, id, roleType);
                    } 
                    else {
                        newEmployee = new Manager (name, email, id, roleType);
                    }
                    employeeArray.push(newEmployee);
                    addToHTML (newEmployee)
                    .then (function(){
                        if (another === "Yes") {
                            addEmployee();
                        } else {
                            renderHTML ();
                        }
                        })
                    }
                )}
    )};

function baseHTML () {
    `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">`
                fs.writeFile("./output/team.html", html, function(err) {
                    if (err) {
                        throw err;
                    }
                });
    console.log ("Begin Write");
};

function addToHTML (employee) {
    return new Promise (function(resolve, reject) {
        const name = employee.getName ();
        const email = employee.getEmail ();
        const id = employee.getId ();
        const role = employee.getRole ();
        let data = "";
        if (role === "Engineer") {
            const gitHub = employee.getGitHub();
            data = `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${name}</h2>
                <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                    <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}" target="_blank" rel="noopener noreferrer">${gitHub}</a></li>
                </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
        const school = employee.getSchool();
        data = 
        `<div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${role}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
        </div>
    </div>`;
        } else {
        const officeNumber = employee.getOfficePhoneNumber ();
        data = 
        `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${name}</h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${role}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
            <li class="list-group-item">Office number: ${officeNumber}</li>
        </ul>
    </div>
</div>`;
        }
        console.log ("adding employee");
        fs.appendFile("./output/team.html", data, function(err) {
            if (err){
            return reject(err)
            } else {
                return resolve ()}
        })
    } 
    )};
        

    function renderHTML () {
        const html = 
        
        `</div>
        </div>
    </div>
</body>

</html>`;
        fs.appendFile("./output/team.html", html, function (err)
        {
            if (err) {
                console.log ("error");
            };
        });
        console.log ("Done")
    };

    init ();
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

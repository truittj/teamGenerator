// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Employee class
// The Letter Class is responsible for displaying either an underscore or the underlying character for each letter in the word
const Employee = require("./Employee");
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super (name, id, email)
        this.github = github;
    }
  
    getRole(){
        return "Engineer"
    }
    getGithub(){
        return this.github;
    }
  }
  
  module.exports = Engineer;
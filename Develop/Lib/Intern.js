// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Employee class
// The Letter Class is responsible for displaying either an underscore or the underlying character for each letter in the word
const Employee = require("./Employee");
class Intern extends Employee {
    constructor(name, id, email, school) {
        super (name, id, email)
        this.school = school;
    }
  
    getRole(){
        return "Intern"
    }
    getSchool(){
        return this.school;
    }
  }
  
  module.exports = Intern;
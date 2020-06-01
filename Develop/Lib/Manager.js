// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Employee class
// The Letter Class is responsible for displaying either an underscore or the underlying character for each letter in the word
const Employee = require("./Employee");
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super (name, id, email)
        this.officeNumber = officeNumber;
    }
  
    getRole(){
        return "Manager"
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
  }
  
  module.exports = Manager;
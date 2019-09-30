const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Employee = new Schema({
  employee_first_name: {
    type: String
  },
  employee_last_name: {
    type: String
  },
  employee_email: {
    type: String
  },
  employee_address: {
    type: String
  }
});

module.exports = mongoose.model("Employee", Employee);

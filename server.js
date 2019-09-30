const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const employeeRoutes = express.Router();
const PORT = 5000;

let Employee = require("./employee.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/employees", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB connection successfull");
});

employeeRoutes.route("/").get(function(req, res) {
  Employee.find(function(err, employees) {
    if (err) {
      console.log(err);
    } else {
      res.json(employees);
    }
  });
});

employeeRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Employee.findById(id, function(err, employee) {
    res.json(employee);
  });
});

employeeRoutes.route("/add").post(function(req, res) {
  let employee = new Employee(req.body);
  employee
    .save()
    .then(employee => {
      res.status(200).json({ "employee: ": "employee added successfully" });
    })
    .catch(err => {
      res.status(400).send("ERROR: employee was not added!");
    });
});

employeeRoutes.route("/update/:id").post(function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    if (!employee) {
      res.status(404).send("ERROR: no data!");
    } else {
      employee.employee_first_name = req.body.employee_first_name;
      employee.employee_last_name = req.body.employee_last_name;
      employee.employee_email = req.body.employee_email;
      employee.employee_address = req.body.employee_address;
    }

    employee
      .save()
      .then(employee => {
        res.json("Employee updated successfully");
      })
      .catch(err => {
        res.status(400).send("ERROR: update failed");
      });
  });
});

app.use("/employees", employeeRoutes);

app.listen(PORT, function() {
  console.log("server is running on port: ", PORT);
});

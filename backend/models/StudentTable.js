const mongoose = require("mongoose")
const schema = mongoose.Schema
const userSchema = new schema({
    email: String,
    password: String
  });
  
const Student = mongoose.model("Student", userSchema);
module.exports = Student;
  
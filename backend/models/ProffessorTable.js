const mongoose = require("mongoose")
const schema = mongoose.Schema
const userSchema = new schema({
    email: String,
    password: String
  });
  
const Prof = mongoose.model("Proffessors", userSchema);
module.exports = Prof;
  
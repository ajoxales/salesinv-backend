const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);

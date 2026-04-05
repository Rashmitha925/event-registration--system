const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  createdBy: String,
  registrations: [
    {
      username: String,
      email: String
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
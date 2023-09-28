const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

mongoose.connect("mongodb://localhost:27017/newcollection", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const contactSchema = {
  Email: String, // Change to "Email" to match the form field
  Query: String, // Change to "Query" to match the form field
};

const Contact = mongoose.model("Contact", contactSchema);

const app = express();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

// Provide the correct path to your static files directory
const staticFilesPath = path.join(__dirname, 'public');
app.use(express.static('C:\Users\cedri\Documents\School work\Fall 2023\IT Capstone\CapstoneCode'));

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.post("/contact", function(req, res) {
  console.log(req.body.email);
  const contact = new Contact({
    email: req.body.email,
    query: req.body.query,
  });
  contact.save(function(err) {
    if (err) {
      throw err;
    } else {
      res.render("contact");
    }
  });
});

app.listen(3000, function() {
  console.log("App is running on Port 3000");
});

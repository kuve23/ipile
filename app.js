require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");



const ipileSChema = new mongoose.Schema({
    first_name: String,
    last_name : String,
    email: String,
    subject: String,
    message : String
});

const Details = mongoose.model("Details", ipileSChema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get("/projects", function(req, res){
    res.render("projects");
})

app.get("/", function(req, res){
    res.render("home");
})

app.get("/team", function(req, res){
    res.render("team");
})

app.get("/about", function(req, res){
    res.render("about");
})

app.get("/contact", function(req,res){
    res.render("contact");
})

app.post("/contact", function(req, res){
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const email = req.body.email;
   const subject = req.body.subject;
   const message = req.body.message;

   const newDetails = new Details({
        first_name : firstName,
        last_name : lastName,
        email : email,
        subject : subject,
        message : message
   })

   newDetails.save()
   res.redirect("/contact")
})

app.listen(3000, function(){
    console.log("server listening on port 3000")
});

mongoose.connect(process.env.STRING);

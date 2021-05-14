//Import modules
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

//Instantiate express app
const app = new express();

//Set view engine
app.set("view engine", "ejs");
app.set("views", "views");

//To serve static files
app.use(express.static(path.join(__dirname, "public")));

//Set body parser
app.use(bodyParser.urlencoded({ extended: false }));

//Import routes
const routes = require("./routes/route");
const { urlencoded } = require("express");

//Use routes
app.use(routes);

app.listen(process.env.PORT || 3000);
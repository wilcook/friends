// Dependencies
var express = require("express");
var mysql = require("mysql");

// Creates express app instance
var app = express();

// Specified the port
var port = 3306;

// MySQL DB Connection Information (Remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1H473Myj0b",
  database: "seinfeld"
});

// MySQL Connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Routes
app.get("/cast", function(req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result"
  connection.query("SELECT * FROM seinfeld ORDER BY id", function(err, result) {

    // We then begin building out HTML elements for the page
    var html = "<h1> Seinfield Cast </h1>";

    // Here we begin an unordered list
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file
    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p>School: " + result[i].name + " </p></li>";
    }

    // We close our unordered list
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

// Initiated the Listener
app.listen(port);

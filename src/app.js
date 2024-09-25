const express = require("express");
const app = express();

//TODO: Create a GET /musicians route to return all musicians 
const musicianRoute = require("./routes/musicians")

app.use("/musicians", musicianRoute)

app.use("/musicians/:id", musicianRoute)

module.exports = app;
"use strict";
const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");


app.use(layouts);
app.get("/name/:myName", homeController.respondWithName);
//app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError)
app.use(express.static("public"));
app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening on port number: ${app.get("port")}`);
});
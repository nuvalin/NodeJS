"use strict";
const port = 3000,
    express = require("express"),
    homeController = require("./controllers/homeController"),
    app = express();
// app.post("/", (req, res) => {
//     console.log("params" + req.params);
//     console.log("body" + req.body);
//     console.log("url" + req.url);
//     console.log("query" + req.query);
//     res.send("Hello, Universe!");
// })
// app.use("/items", (req, res, next) => {
//     console.log(`request made to: ${req.url}`);
//     next();
// app.use(
//     express.urlencoded({
//         extended: false
//     })
// );
// app.use(express.json());
// app.post("/", (req, res) => {
//     console.log("body" + req.body);
//     console.log("query" + req.query);
//     res.send("POST Successful!");
// });

//    });
// app.get("/items/:vegetable", (req, res) => {
//     res.send(req.params.vegetable);
//     })
app.get("/items/:vegetable", homeController.sendReqParam);
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening
➥ on port number: ${port}`);
});




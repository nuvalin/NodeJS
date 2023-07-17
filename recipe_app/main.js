
const express = require("express"),
  app = express(),
  router = express.Router(),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  User = require("./models/user");
expressValidator = require("express-validator");
passport = require("passport");


methodOverride = require("method-override");

errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController");

subscribersController = require("./controllers/subscribersController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://127.0.0.1:27017/recipe_db",
  { useNewUrlParser: true }
);


const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});



app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(cookieParser("secret_passcode"));
router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
router.use(connectFlash());
app.use(express.static("public"));
app.use(layouts); https://code.visualstudio.com
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]

}));


  router.use(expressValidator());
  router.use(passport.initialize());
  router.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use("/", router)

router.get("/users/new", usersController.new);
router.get("/users/login", usersController.login);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  res.render("subscribers", { subscribers: req.data });
});
router.get("/users/login", usersController.login);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users", usersController.index, usersController.indexView);
router.post("/users/login", usersController.authenticate);
router.get("/users/:id", usersController.show, usersController.showView);

router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);



// app.get("/contact", subscribersController.getSubscriptionPage);
// app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://127.0.0.1:${app.get("port")}`);
});


const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;










// const Course = require("./models/course");
// var testCourse, testSubscriber;
// Course.create({
//     title: "Tomato Land",
//     description: "Locally farmed tomatoes only",
//     zipCode: 12345,
//     items: ["cherry", "heirloom"]
// }).then(course => testCourse = course);
// Subscriber.findOne({}).then(
//     subscriber => testSubscriber = subscriber
// );
// testSubscriber.courses.push(testCourse._id);
// testSubscriber.save();
// Subscriber.populate(testSubscriber, "courses").then(subscriber =>
//     console.log(subscriber)
// );


console.log(Subscriber.find({ courses: new mongoose.Types.ObjectId("645576e5996e00edad2e1465") }));
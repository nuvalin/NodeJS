
// .then(subscr => {
//     console.log(subscr.getInfo());
// })
//     .catch((error => {
//         console.log("error occured");
//         console.log(error);
//     })


//    Subscriber.create({
//         name: "Jon Wexler",
//         email: "jon@gmail.com",
//         zipCode: 10000
//     })
//             .then((result) => {
//                 console.log("result");
//                 console.log(result);
//             })
//             .catch((err) => {
//                 console.log("err");
//                 console.log(err);
//             })

//    Subscriber.findOne({
//                 name: "Jon"
//             })
//             .then(subscr => {
//                 console.log(subscr.getInfo());
//             })
//             .catch(error => {
//                 console.log("error occurred");
//                 console.log(error);
//             })



// Subscriber.findOne({
//     name: "Jon"
// })
//     .then(subscr => {
//         console.log(subscr.findLocalSubscribers());
//     })
//     .catch(error => {
//         console.log("error occurred");
//         console.log(error);
//     })



// Subscriber.findOne({
//     name: "Jon"
// })
//     .then((result) => {
//         result.findlocalSubscribers()
//             .then((result) => {
//                 console.log("result of local sub");
//                 console.log(result);
//             })
//     })
//     .catch((error) => {
//         console.log("error");
//         console.log(err);
//     })


// const Course = require("./models/course");
// var testCourse, testSubscriber;
// Course.create( {
//  title: "Tomato Land",
//  description: "Locally farmed tomatoes only",
//  zipCode: 12345,
//  items: ["cherry", "heirloom"]
// }).then(course => testCourse = course);
// Subscriber.findOne({}).then(
//  subscriber => testSubscriber = subscriber
// );
// testSubscriber.courses.push(testCourse._id);
// testSubscriber.save();
// Subscriber.populate(testSubscriber, "courses").then(subscriber =>
//  console.log(subscriber)
// );

//  Subscriber.find({courses: new mongoose.Types.ObjectId("645456e82e229378495c07c4")});

const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    Course = require("./models/course");
var testCourse,
    testSubscriber;
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
Subscriber.deleteMany({})
    .then((items) => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Course.deleteMany({});
    })
    .then((items) => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Subscriber.create({
            name: "Jon",
            email: "jon@jonwexler.com",
            zipCode: "12345"
        });
    })
    .then(subscriber => {
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Subscriber.findOne({
            name: "Jon"
        });
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Course.create({
            title: "Tomato Land",
            description: "Locally farmed tomatoes only",
            zipCode: 12345,
            items: ["cherry", "heirloom"]
        });
    })
    .then(course => {
        testCourse = course;
        console.log(`Created course: ${course.title}`);
    })
    .then(() => {
        testSubscriber.courses.push(testCourse);
        testSubscriber.save();
    })
    .then(() => {
        return Subscriber.populate(testSubscriber, "courses");
    })
    .then(subscriber => console.log(subscriber))
    .then(() => {
        return Subscriber.find({
            courses: new mongoose.Types.ObjectId(testCourse._id)
        });
    })
    .then(subscriber => console.log(subscriber))
    .catch(error => console.log(error));



    const User = require("./models/user");
    var testUser;
User.create({
    name: {
        first: "Jon",
        last: "Wexler"
    },
    email: "jon@jonwexler.com",
    password: "pass123"
})
    .then(user => testUser = user)
    .catch(error => console.log(error.message));
    
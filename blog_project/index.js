const express = require('express');
const app = new express();
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');


const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logOutController = require('./controllers/logout');


const validateMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nuvzmoodley:C9AFEHL477SVOsqF@nodeapp.92xrjpz.mongodb.net/my_database', { useNewUrlParser: true });


global.loggedIn = null;


app.set('view engine', 'ejs');


app.use(express.static('public'));


app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.use(fileUpload());


app.use(expressSession({
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true 
}));

app.use(flash());


app.use('/posts/store', validateMiddleware);

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next();
});


app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController);
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController);
app.get('/auth/logout', logOutController);
app.use((req, res) => res.render('notFound')); 

let port = process.env.PORT;
if (port == null || port == "") {
 port = 4000;
}
app.listen(port, ()=>{
 console.log('App listening...') 
});
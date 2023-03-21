const express = require('express');
const password = require('secure-random-password');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const Authentication = require('./Router/authentication.js');
const Login = require('./Router/login+email');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/partials');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Login);
app.use(Authentication);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/sign-in.html');
})

app.get('/Register', function (req, res) {
    res.sendFile(__dirname + '/html/Register.html');
})

app.get('/Registered' , (req,res) => {
    res.sendFile(__dirname + '/html/Registered.html');
})

app.listen(3000, function () {
    console.log("Hello");
})
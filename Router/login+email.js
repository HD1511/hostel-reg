const express = require('express');
const session = require('express-session');
const passport = require('passport');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const Password = require('secure-random-password');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../mongoDB/connLogin');
const Email = require('../mongoDB/connEmail+password');
const router = express.Router();

let userProfile, rNum = "HS", pass;
let fname, lname, pNum, clgName, Cast, BloodGroup, State, City, pinCode, gridRadio, date;

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'harshdob937@gmail.com',
        pass: 'dvdimweqwxryoznq'
    },
    tls: {
        rejectUnauthorized: false,
    }
});

router.use(bodyParser.urlencoded({ extended: true }));

router.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const GOOGLE_CLIENT_ID = '998626350340-g0poi6j0d36flr3ptfdatl35n5kji7mh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://hostel-reg.onrender.com/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/error',
        successRedirect: '/success'
    }));

router.post('/Register', async (req, res) => {
    ({ fname, lname, pNum, clgName, Cast, BloodGroup, State, City, pinCode, gridRadio, date } = req.body);
    if (gridRadio === 'option1') gridRadio = 'Male';
    else gridRadio = 'Female';

    return res.redirect('/auth/google');
})

router.get('/success', async (req, res) => {
    try {
        const findUserByPhoneNumber = await User.findOne({ pNum });
        const findUserByEmail = await Email.findOne({ email : userProfile.emails[0].value });
        if (findUserByPhoneNumber || findUserByEmail) {
            return res.redirect('/Registered');
        }

        const user = new User({ fname, lname, pNum, clgName, Cast, BloodGroup, State, City, pinCode, gridRadio, date });
        await User.insertMany([user]);

        const findUsers = await Email.find();
    } catch (err) {
        console.log(err);
    }

    try {
        const findUsers = await Email.find();
        console.log(findUsers.length);

        rNum += (findUsers.length + 1);
        pass = Password.randomPassword({ length: 6, characters: Password.digits })

        const insertUser = new Email({email : userProfile.emails[0].value,rNum,password : pass});
        await Email.insertMany([insertUser]);
    } catch (err) {
        console.log(err);
    }

    mailTransporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    mailTransporter.sendMail({
        from: 'harshdob937@gmail.com',
        to: userProfile.emails[0].value,
        subject: 'Your Hostel Registration number and Password',
        html: `<div>Your Registration number : ${rNum}<div/>
               <div>Password : ${pass}</div>`
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });

    return res.redirect('/');
});

router.get('/error', (req, res) => res.send("error logging in"));

module.exports = router;
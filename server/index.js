const express = require("express");
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


const port = 3000;
const kyu ="```人◕‿‿◕人```"

const app = express();

// our database connection information
const connectionString = `postgres://loy@localhost/loy`;


const { secret } = require('../config').session;
const { dbUser, database } = require('../config').db;
const { domain, clientID, clientSecret } = require('../config').auth0;






// required middlewares
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../public`));

// connecting to our DB with massive
massive(connectionString).then(db => app.set('db', db));

// setting up express sessions
// secret: config.session.secret;
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

// using passport to access auth0
// { domain: config.auth0.domain ... etc}
passport.use(new Auth0Strategy({
    domain,
    clientID,
    clientSecret,
    callbackURL:  '/auth/callback'
   }, (accessToken, refreshToken, extraParams, profile, done) => {
     //Find user in database
     console.log(profile.id);
     const db = app.get('db');
     // .then means this is a promise
     db.getUserByAuthId([profile.id]).then((user, err) => {
         console.log('INITIAL: ', user);
       if (!user[0]) { //if there isn't a user, we'll create one!
         console.log('CREATING USER');
         db.createUserByAuth([profile.displayName, profile.id]).then((user, err) => {
           console.log('USER CREATED', user[0]);
           return done(err, user[0]); // GOES TO SERIALIZE USER
         })
       } else { //when we find the user, return it
         console.log('FOUND USER', user[0]);
         return done(err, user[0]);
       }
     });
   }
 ));

 // put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

 // pull user from session for manipulation
 passport.deserializeUser((user, done) => {
     console.log(user);
     done(null, user);
 });


 // General Endpoints
app.get('/api/test', (req, res, next) => {
    app.get('db').users.find({}).then(response => {
        res.json(response);
    });
});


// auth endpoints

// initial endpoint to fire off login
app.get('/auth', passport.authenticate('auth0'));

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    res.status(200).json(req.user);
});

// remove user from session
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});




app.listen(() => {
    console.log(`${kyu}`)
})
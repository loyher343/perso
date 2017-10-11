const express = require("express");
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const Auth0Strategy = require('passport-auth0');

const { secret } = require('../config').session;
const { dbUser, database } = require('../config').db;
const { domain, clientID, clientSecret } = require('../config').auth0;

const port = 3000;
const kyu ="```人◕‿‿◕人```"

                                //change this
const connectionString = `postgres://${dbUser}@localhost/${database}`;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../public`));

massive(connectionString).then(db => app.set('db', db));

app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// using passport to access auth0
// { domain: config.auth0.domain ... etc}

// passport.use('local', new LocalStrategy(
//     (username , password, done) => {
//         db.user.findOne({ username: username }, (err, user) => {
//             if (err) { return done(err); }
//             if (!user) { return done(null,false); }
//             if (user.password != password) { return done(null, false); }
//             return done(null, user);
//         })
//     }
// ))



// using passport to access auth0
// { domain: config.auth0.domain ... etc}
passport.use(new Auth0Strategy({
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL:  '/auth/callback'
   }, (accessToken, refreshToken, extraParams, profile, done) => {
     //Find user in database
     console.log("This is dat profile:", profile);
     const db = app.get('db');
     // .then means this is a promise
     db.getUserByAuthId([profile._json.sub]).then((user, err) => {
         console.log('INITIAL: ', user);
       if (!user[0]) { //if there isn't a user, we'll create one!
         console.log('CREATING USER:');
         db.createUserByAuth([profile.displayName, profile._json.sub, profile._json.nickname, profile._json.picture]).then((user, err) => {
             console.log(user)
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

//  passport.logout({
//      returnTo: '/',
//      clientID
//  })

 // put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

 // pull user from session for manipulation
 passport.deserializeUser((user, done) => {
     
     done(null, user);
 });

 // General Endpoints
app.get('/api/test', (req, res, next) => {
    
    app.get('db').users.find({}).then(response => {
        res.json(response);
    });
});







app.post('/api/comicbooks', (req, res, next) => {
    console.log('Issue #',req.body.issue_number)
    console.log('img',req.body.image.medium_url)
    console.log("***********************" ,req.user)
    const descr = req.body.description
    const nome =req.body.volume.name
    req.app
    .get('db')
    .postComic([
        req.body.issue_number,
        req.body.description,
        req.body.volume.name,
        req.body.image.medium_url,
        req.body.id,
        req.user.authid,
    ])
});


// app.post('/addMeal', (req, res) => {
//     console.log(req.body)
//     req.app
//       .get('db')
//       .upload_pic(req.body)
//   });



app.get('/api/test1', (req,res) => {
    console.log(req.body)
    console.log('endpoint')
    const db = req.app.get('db');
  
   db.getUser(req.body)
    .then(response => {
    console.log(response)
    return res.json(response)
  })
  })

app.get('/auth/session', (req,res,next) => {
    console.log(req.user)
    res.send(req.session)
})

// auth endpoints
app.put('/api/users', (req,res,next) => {
    const db = req.app.get('db');
    console.log(req.session.passport.user.authid);
    console.log(req.body)
    db.updateUser([req.session.passport.user.authid, req.body.first, req.body.last, req.body.email]).then((user)=>{
      console.log(req.session);
      res.json(user);
    }).catch(error => console.log('ERROR:', error))
  })
// initial endpoint to fire off login

app.get('/auth', passport.authenticate('auth0', {scope: 'openid profile'}));

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/#!/collection',failurRedirect: '/' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    //console.log("++++++++", req.user)
    res.status(200).json(req.user);
});

// remove user from session
app.get('/auth/logout', (req, res) => {
    console.log('logging out');
    console.log(req.user)
    req.logout();
    res.redirect('/');
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });
app.listen(port,() => {
    console.log(`${kyu}`)
})
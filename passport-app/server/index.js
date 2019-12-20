// import dependencies
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const chalk = require("chalk");

// import social media developer keys
const keys = require("../config/index.js");

// create user database placeholder
let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: keys.FACEBOOK.clientID,
  clientSecret: keys.FACEBOOK.clientSecret,
  callBackUrl: "/auth/facebook/callback"
},
  (accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, profile);
}));

// create server
const app = express();
app.use(cors());
app.use(passport.initialize());

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
  passport.authenticate(("facebook"),
  (req, res) => {
    res.redirect("/profile");
  })
);

// start server listening
const PORT = 5000;
app.listen(PORT);
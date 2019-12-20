// import dependencies
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const chalk = require("chalk");

// import social media developer keys
const keys = require("");

// create user database placeholder
let user = {};
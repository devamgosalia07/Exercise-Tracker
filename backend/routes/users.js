// const router = require("express").Router();
// const User = require("../models/user.model");

// router.route("/").get((req, res) => {
//     User.find()
//         .then((users) => res.json(users))
//         .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/add").post((req, res) => {
//     const username = req.body.username;
//     const newUser = new User({ username });
//     newUser
//         .save()
//         .then(() => res.json("User added!"))
//         .catch((err) => res.status(400).json("Error: " + err));
// });

// module.exports = router; 


const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const secretKey = "yourSecretKey"; // Replace with your own secret key

// Create a middleware for generating and verifying JWT tokens
const authenticate = expressJwt({ secret: secretKey, algorithms: ['HS256'] });

// Public route for getting users
router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Secure route for adding users (requires token)
router.route("/add").post(authenticate, (req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;



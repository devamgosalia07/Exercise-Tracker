const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Secret key for JWT
const secretKey = "yourSecretKey"; // Replace with your own secret key

// Authentication route
router.post("/login", (req, res) => {
    const username = req.body.username;

    // You should perform user authentication here
    // For this example, we'll assume a user with a hardcoded username
    if (username === "yourUser") {
        // Generate a JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json("Authentication failed");
    }
});

module.exports = router;

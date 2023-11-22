// const express = require("express");
// const cors = require("cors");
// const mongoose = require('mongoose');

// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // MongoDB
// const uri = 'mongodb+srv://devamgosalia:dev091003@cluster0.pckbwfe.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//         // Your code here
//     })
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // Routes
// const exercisesRouter = require("./routes/exercises");
// const usersRouter = require("./routes/users");

// app.use("/exercises", exercisesRouter);
// app.use("/users", usersRouter);

// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = 'mongodb+srv://devamgosalia:dev091003@cluster0.pckbwfe.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Secret key for JWT
const secretKey = "yourSecretKey"; 

// Create a middleware for generating and verifying JWT tokens
const authenticate = expressJwt({ secret: secretKey, algorithms: ['HS256'] });

// Include authentication routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);

// Sample secured route (requires token)
app.get("/secured", authenticate, (req, res) => {
    res.json({ message: "This is a secured route." });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

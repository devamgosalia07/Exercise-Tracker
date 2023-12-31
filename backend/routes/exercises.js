const router = require("express").Router();
const Exercise = require("../models/exercise.model");
const asyncHandler = require('express-async-handler');

router.route("/").get((req, res) => {
    Exercise.find()
        .then((exercises) => res.json(exercises))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const trainer = req.body.trainer;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        trainer,
        duration,
        date,
    });
    newExercise
        .save()
        .then(() => res.json("Exercise added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => res.json(exercise))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put( async (req, res) => {
    try {
        console.log("")
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json("Update done!");
    } catch (err) {
        res.status(500).json("Not updated!");
    }
});

module.exports = router;
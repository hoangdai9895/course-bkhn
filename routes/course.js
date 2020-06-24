const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const passport = require("passport");
const admin = require("../utils/admin");

router.get("/", (req, res) => {
  let query = {};
  Course.find(query)
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "createdBy",
      model: "User",
    })
    .then((course) => {
      res.status(200).json(course);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Course.find({ _id: req.params.id })
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "createdBy",
      model: "User",
    })
    .then((course) => {
      res.status(200).json(course);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  admin,
  (req, res) => {
    const course = new Course(req.body);
    course
      .save()
      .then((course) => {
        res.status(200).json(course);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  admin,
  (req, res) => {
    Course.deleteOne({ _id: req.params.id })
      .then((ques) => {
        res.status(200).json({ id: req.params.id });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;

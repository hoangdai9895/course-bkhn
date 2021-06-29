const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const passport = require("passport");
const admin = require("../utils/admin");

router.get("/", (req, res) => {
  let query = {};
  Exam.find(query)
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "createdBy",
      model: "User",
    })
    .then((exam) => {
      res.status(200).json(exam);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Exam.find({ _id: req.params.id })
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "createdBy",
      model: "User",
    })
    .then((exam) => {
      res.status(200).json(exam);
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
    const exam = new Exam(req.body);
    exam
      .save()
      .then((exam) => {
        res.status(200).json(exam);
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
    Exam.deleteOne({ _id: req.params.id })
      .then((ques) => {
        res.status(200).json({ id: req.params.id });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  admin,
  (req, res) => {
    Exam.findByIdAndUpdate(
      req.body._id,
      {
        ...req.body,
      },
      { new: true, useFindAndModify: false }
    )
      .then((exam) => {
        res.status(200).json({ exam });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;

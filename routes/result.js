const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const passport = require("passport");

router.get("/", (req, res) => {
  console.log(res.locals.user);

  Result.find({})
    .populate({ path: "user", model: "User" })
    .populate({ path: "course", model: "Course" })
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(400).json({ err }));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const result = new Result(req.body);
    result
      .save()
      .then((result) => {
        res.status(200).json({ success: true, result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;

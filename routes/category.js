const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const passport = require("passport");
const admin = require("../utils/admin");

router.get("/", async (req, res) => {
  let total = await Category.countDocuments();
  const { page } = req.query;
  Category.find({})
    .skip((page ? page - 1 : 0) * 10)
    .limit(10)
    .then((category) =>
      res.status(200).json({
        data: category,
        total,
      })
    )
    .catch((err) => res.status(400).json({ err }));
});

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  admin,
  (req, res) => {
    Category.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        updated_at: Date.now(),
      },
      { new: true, useFindAndModify: false }
    )
      .then((ques) => {
        res.status(200).json({ ques });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  admin,
  (req, res) => {
    const category = new Category(req.body);
    category
      .save()
      .then((category) => {
        res.status(200).json({ success: true, category });
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
    Category.deleteOne({ _id: req.params.id })
      .then((ques) => {
        res.status(200).json({ id: req.params.id });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;

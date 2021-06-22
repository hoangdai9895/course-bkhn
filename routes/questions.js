const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const passport = require("passport");
const admin = require("../utils/admin");

router.get("/", async (req, res) => {
	let count = await Question.countDocuments();
	const { page } = req.query;
	Question.find({})
		.populate({ path: "category", model: "Category" })
		.skip((page ? page - 1 : 0) * 10)
		.limit(10)
		.then((ques) => {
			res.status(200).json({
				data: ques,
				total: count,
			});
		})
		.catch((err) => res.status(400).json({ err }));
});

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		const question = new Question(req.body);
		question
			.populate({ path: "category", model: "Category" })
			.save()
			.then((question) => {
				// res.status(200).json({ success: true, question });
				Question.find({ _id: question._id })
					.populate({ path: "category", model: "Category" })
					.then((ques) => res.status(200).json(ques));
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
		Question.remove({ _id: req.params.id })
			.then((ques) => {
				res.status(200).json({ id: req.params.id });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

router.post(
	"/update",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		console.log(req.params._id);
		Question.findByIdAndUpdate(
			req.body._id,
			{
				answers: req.body.answers,
				question: req.body.question,
				correctAnswer: req.body.correctAnswer,
				category: req.body.category,
				updated_at: Date.now(),
			},
			{ new: true, useFindAndModify: true }
		)
			.populate({ path: "category", model: "Category" })
			.then((ques) => {
				res.status(200).json({ ques });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

module.exports = router;

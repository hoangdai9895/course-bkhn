const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const passport = require("passport");

router.get("/", async (req, res) => {
	console.log(res.locals.user);
	let count = await Result.countDocuments();
	const { page } = req.query;
	Result.find({})
		.populate({ path: "user", model: "User" })
		.populate({ path: "exam", model: "Exam" })
		.skip((page ? page - 1 : 0) * 10)
		.limit(10)
		.then((results) =>
			res.status(200).json({
				data: results,
				total: count,
			})
		)
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

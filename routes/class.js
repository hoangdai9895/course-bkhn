const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const ClassStudent = require("../models/ClassStudent");
const passport = require("passport");
const admin = require("../utils/admin");

router.get("/", async (req, res) => {
	let count = await Class.countDocuments();
	const { page, id } = req.query;
	const query = {};
	console.log(id);
	if (id) {
	}
	Class.find(query)
		.populate({
			path: "teacher",
			model: "User",
		})
		.populate({
			path: "exam",
			model: "Exam",
		})
		.populate({
			path: "students",
			model: "User",
		})
		.limit(10)
		.skip((page ? page - 1 : 0) * 10)
		.then((classData) => {
			console.log(classData);
			res.status(200).json({ data: classData, total: count });
		})
		.catch((err) => res.status(400).json({ err }));
});

router.get("/:id", async (req, res) => {
	const { page } = req.query;
	const { id } = req.params;
	let count = await Class.countDocuments();
	const student = await ClassStudent.find({ _id: id });

	Class.find({ _id: id })
		.populate({
			path: "teacher",
			model: "User",
		})
		.populate({
			path: "exam",
			model: "Exam",
		})
		.populate({
			path: "students",
			model: "User",
		})
		.limit(10)
		.skip((page ? page - 1 : 0) * 10)
		.then((classRes) =>
			res
				.status(200)
				.json({ data: { ...classRes, student }, total: count })
		)
		.catch((err) => res.status(400).json({ err }));
});

//UPDATE
router.put(
	"/update",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		Class.findByIdAndUpdate(
			req.body._id,
			{
				name: req.body.name,
				teacher: req.body.teacher,
				exam: req.body.exam,
				students: req.body.students,
				updated_at: Date.now(),
			},
			{ new: true, useFindAndModify: false }
		)
			.then((data) => {
				res.status(200).json({ data });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

//CREATE
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		const classModel = new Class(req.body);
		classModel
			.save()
			.then((classRes) => {
				res.status(200).json({ success: true, classRes });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

//DELETE
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		Class.deleteOne({ _id: req.params.id })
			.then((ques) => {
				res.status(200).json({ id: req.params.id });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const admin = require("../utils/admin");

// Register ======================================
router.post("/register", (req, res) => {
	User.findOne({ username: req.body.username }).then((user) => {
		if (user) {
			return res.status(400).json({ err: "Username already exists !!" });
		} else {
			const newUser = new User({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json({ success: true, user }))
						.catch((err) =>
							res.status(400).json({ success: false, err })
						);
				});
			});
		}
	});
});

// Login =========================
router.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username }).then((user) => {
		if (!user) {
			return res.status(400).json({ err: "User not found!!!" });
		}
		bcrypt.compare(password, user.password).then((match) => {
			if (match) {
				const payload = {
					id: user.id,
					username: user.username,
					role: user.role,
					email: user.email,
				};
				jwt.sign(
					payload,
					process.env.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) res.json(err);
						res.json({ success: true, token: `Bearer ${token}` });
					}
				);
			} else {
				return res.status(400).json({ err: "Password incorrect" });
			}
		});
	});
});

//GET ALL
router.get("/", async (req, res) => {
	const { role, page } = req.query;
	const query = role ? { role } : {};
	const total = await User.countDocuments(query);

	User.find(query)
		.skip((page ? page - 1 : 0) * 10)
		.limit(10)
		.then((users) => {
			res.status(200).json({
				data: users.map((e) => {
					e.password = null;
					return e;
				}),
				total,
			});
		})
		.catch((err) => res.status(400).json({ err }));
});

// UPDATE USER
router.put(
	"/update",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		User.findByIdAndUpdate(
			req.body._id,
			{
				name: req.body.name,
				updated_at: Date.now(),
				role: req.body.role,
			},
			{ new: true, useFindAndModify: false }
		)
			.then((user) => {
				res.status(200).json({ user });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

// DELETE USER
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	admin,
	(req, res) => {
		User.remove({ _id: req.params.id })
			.then((ques) => {
				res.status(200).json({ id: req.params.id });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
);

module.exports = router;

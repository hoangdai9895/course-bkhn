const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
	exam: {
		type: Schema.Types.ObjectId,
		ref: "Exam",
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	last_update: {
		type: Date,
		default: Date.now(),
	},
	result: {
		type: String,
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = result = mongoose.model("Result", resultSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100,
		unique: true,
	},
	updated_at: {
		type: Date,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
	updated_by: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = category = mongoose.model("Category", categorySchema);

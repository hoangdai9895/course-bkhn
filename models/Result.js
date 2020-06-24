const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
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
});

module.exports = result = mongoose.model("Result", resultSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    maxlength: 500,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  time: {
    type: Number,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = exam = mongoose.model("Exam", examSchema);

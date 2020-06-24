const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  question: {
    required: true,
    type: String,
    maxlength: 200,
  },
  answers: [
    {
      type: String,
      maxlength: 100,
    },
  ],
  correctAnswer: {
    required: true,
    type: Number,
    maxlength: 1,
  },
});

module.exports = question = mongoose.model("Question", questionSchema);

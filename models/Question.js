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
  updated_at:{
    type: Date
  },
  created_at:{
    type: Date, 
    default: Date.now()
  },
  updated_by:{
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = question = mongoose.model("Question", questionSchema);

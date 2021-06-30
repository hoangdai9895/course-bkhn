const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
  },
  updated_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = classModel = mongoose.model("Class", classSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classStudentSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = classStudent = mongoose.model(
  "ClassStudent",
  classStudentSchema
);

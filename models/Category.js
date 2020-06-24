const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
});

module.exports = category = mongoose.model("Category", categorySchema);

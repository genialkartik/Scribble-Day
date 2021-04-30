const mongoose = require("mongoose");

const instituteSchema = mongoose.Schema({
  instituteId: {
    type: String,
    required: true,
    unique: true,
  },
  instituteName: {
    type: String,
    unique: true,
    required: true,
  },
  instituteLogo: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Institute = mongoose.model("institutes", instituteSchema);
module.exports = Institute;

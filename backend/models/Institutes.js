const mongoose = require("mongoose");

const instituteSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  logo: {
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

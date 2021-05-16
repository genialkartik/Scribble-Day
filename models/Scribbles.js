const mongoose = require("mongoose");

const scribbleSchema = mongoose.Schema({
  scribbleId: {
    type: String,
    required: true,
    unique: true,
  },
  sendByUserId: {
    type: String,
    required: true,
  },
  sendByName: {
    type: String,
    required: true,
  },
  sendByAvatar: {
    type: String,
  },
  sendToUserId: {
    type: String,
    required: true,
  },
  sendToName: {
    type: String,
    required: true,
  },
  sendToAvatar: String,
  sendToGender: String,
  dimensions: Object,
  message: {
    type: String,
    required: true,
  },
  angle: Number,
  colorCode: String,
  fontStyle: String,
  fontSize: String,
  side: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Scribble = mongoose.model("scribbles", scribbleSchema);
module.exports = Scribble;

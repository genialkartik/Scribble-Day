const mongoose = require("mongoose");

const scribbleSchema = mongoose.Schema({
  scribbleId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  senderUserId: String,
  senderName: {
    type: String,
    required: true,
  },
  senderAvatar: String,
  dimensions: Object,
  message: String,
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

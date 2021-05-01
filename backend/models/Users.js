const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  avatar: String,
  university: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  scribbleImageFront: String,
  scribbleImageBack: String,
  scribbledBy: [
    {
      userId: String,
      name: String,
      avatar: String,
    },
  ],
  downloaded: {
    type: Boolean,
    default: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.findByCredentials = async (email, pin) => {
  // Search for a user by email and pin.
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  } else {
    // const ispinMatch = await bcrypt.compare(pin, user.pin);
    // if (!ispinMatch) {
    //   return null;
    // } else {
    //   return user;
    // }
    return pin == user.pin ? user : null;
  }
};

const User = mongoose.model("users", userSchema);
module.exports = User;

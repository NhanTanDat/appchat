const mongoose = require("mongoose");

require("dotenv").config();

const friendSchema = new mongoose.Schema({
  id: { type: String},
});
const friendRequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sentAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    avatar: { type: String, default: "https://tandat.s3.ap-southeast-1.amazonaws.com/images/1716625763969-avarter.svg" },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    phone: { type: String, required: true , minlength: 10},
    password: { type: String, required: true, minlength: 3, maxlength: 100 },
    friends: { type: [friendSchema], default: [] },
    friendRequest:  { type: [friendRequestSchema], default: [] },
  },
  {
    timestamps: true,
  },
  { versionKey: 'version' }
);
userSchema.pre('save', function(next) {
  const doc = this;
  doc.increment();
  return next();
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

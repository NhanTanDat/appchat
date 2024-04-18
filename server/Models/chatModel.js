const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);
// Index definition
chatSchema.index({ members: 1 });

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;

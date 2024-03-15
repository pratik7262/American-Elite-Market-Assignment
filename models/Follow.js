const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const followSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Follow = model("Follow", followSchema);

module.exports = Follow;

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;

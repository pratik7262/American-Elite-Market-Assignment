const mongoose = require("mongoose");
const Follow = require("../models/Follow.js");
const Post = require("../models/Post.js");

// Controller to create posts
exports.create = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(200).json({ message: "Please Provide Content" });
    }

    const userId = req.user.id;

    const post = new Post({
      content,
      userId,
    });

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get all posts of particular user
exports.getPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ userId }).populate({
      path: "userId",
      select: "username profilePictureUrl",
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get posts from users whom given user follows
exports.getFollowedUsersPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const pipeline = [
      {
        $match: {
          followerId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "userId",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $unwind: "$posts",
      },
      {
        $lookup: {
          from: "users",
          localField: "posts.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          "posts.username": { $arrayElemAt: ["$user.username", 0] },
          "posts.profilePictureUrl": {
            $arrayElemAt: ["$user.profilePictureUrl", 0],
          },
        },
      },
      {
        $group: {
          _id: null,
          posts: { $push: "$posts" },
        },
      },
      {
        $project: { _id: 0, posts: 1 },
      },
    ];

    const result = await Follow.aggregate(pipeline);
    res.json(result[0].posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller to update particular post
exports.update = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { content } = req.body;
    const post = await Post.findOne({ _id: id, userId });

    if (!post) {
      return res.status(404).json({ message: "Access Denied" });
    }
    post.content = content || post.content;

    await post.save();

    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller to delete particular post
exports.deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const post = await Post.findOne({ _id: id, userId });
    if (!post) {
      return res.status(401).json({ message: "Access Denied" });
    }
    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

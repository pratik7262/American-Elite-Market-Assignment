const mongoose = require("mongoose");
const Follow = require("../models/Follow.js");

// Controller function to follow or unfollow a user
exports.followOrUnfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const followerId = req.user.id;

    const existingFollow = await Follow.findOne({ userId, followerId });

    if (existingFollow) {
      await Follow.findOneAndDelete({ userId, followerId });
      res.status(200).json({ message: "User unfollowed successfully." });
    } else {
      const follow = new Follow({ userId, followerId });
      await follow.save();
      res.status(201).json({ message: "User followed successfully." });
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Controller function for getting followers and following list and count
exports.getFollowersFollowings = async (req, res) => {
  try {
    const userId = req.user.id;

    const followersList = await Follow.find({ userId }).populate({
      path: "followerId",
      select: "username profilePictureUrl",
    });

    const followingList = await Follow.find({ followerId: userId }).populate({
      path: "userId",
      select: "username profilePictureUrl",
    });

    res.status(200).json({
      followersList,
      followingList,
      followers: followersList.length,
      following: followingList.length,
    });
  } catch (error) {
    console.error("Error getting followers and followings count:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

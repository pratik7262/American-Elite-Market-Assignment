const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4 } = require("uuid");
const { validationResult } = require("express-validator");
const { handleErrors } = require("../utils/routerUtils.js");
const Follow = require("../models/Follow.js");
const Post = require("../models/Post.js");
dotenv.config();

// Controller for registering new user
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const { name, username, email, password, bio } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const id = `${username}-${v4()}`;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePictureUrl = req.file ? req.file.path : null;

    const newUser = new User({
      name,
      username,
      email,
      bio,
      password: hashedPassword,
      profilePictureUrl,
      id,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ success: true, savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for login user
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User Does Not Exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.password = "Incrypted";

    res.status(200).json({ token, user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting user information
exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

// Controller for updating user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.username !== user.username) {
      const existingUsername = await User.findOne({
        username: req.body.username,
      });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    if (req.body.email !== user.email) {
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }

    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.profilePictureUrl = req.file ? req.file.path : user.profilePictureUrl;

    await user.save();

    res.status(200).json({ message: "User updated Successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for deleting user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    await Follow.deleteMany({ userId });
    await Follow.deleteMany({ followerId: userId });
    await Post.deleteMany({ userId });

    return res
      .status(200)
      .json({ message: "User Account Deleted Successfully" });
  } catch (error) {}
};

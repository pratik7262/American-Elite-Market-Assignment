const express = require("express");
const {
  create,
  deletePost,
  getFollowedUsersPosts,
  getAllPosts,
  update,
  getPost,
} = require("../controllers/post.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getuserposts", verifyToken, getPost);
router.get("/getfollowedusersposts", verifyToken, getFollowedUsersPosts);
router.get("/getallposts", getAllPosts);
router.patch("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, deletePost);

module.exports = router;

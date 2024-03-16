const express = require("express");
const {
  followOrUnfollowUser,
  getFollowersFollowings,
  //   getFollowersAndFollowingsCount,
} = require("../controllers/follow.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/followunfollow/:id", verifyToken, followOrUnfollowUser);
router.get("/getfollowerfollowing", verifyToken, getFollowersFollowings);

module.exports = router;

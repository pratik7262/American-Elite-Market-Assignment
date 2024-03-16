const express = require("express");
const {
  login,
  register,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/auth.js");
const { verifyToken } = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");
const { signInRules, signUpRules } = require("../utils/routerUtils.js");

const router = express.Router();

router.post("/register", signUpRules, upload.single("image"), register);
router.post("/login", signInRules, login);
router.get("/getuser", verifyToken, getUser);
router.patch("/update", verifyToken, upload.single("image"), updateUser);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;

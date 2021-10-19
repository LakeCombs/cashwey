const express = require("express");
const {
  siginInUser,
  registerUser,
  editUser,
} = require("../controller/UserController");

const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(siginInUser);
router.route("/profile").post(editUser);

module.exports = router;

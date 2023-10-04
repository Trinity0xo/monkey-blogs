const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const fetchProfile = require("../middlewares/fetchProfile");
const followProfileController = require("../controllers/followProfileController");

const router = express.Router();

router.post(
  "/follow-unfollow/:username",
  jwtAuth,
  fetchProfile,
  followProfileController.followOrUnfollowAUser
);

module.exports = router;
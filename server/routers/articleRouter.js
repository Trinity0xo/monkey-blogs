const express = require("express");
const validator = require("../middlewares/validator");
const mongoUpload = require("../middlewares/mongoUpload");
const requiredAuth = require("../middlewares/requiredAuth");
const articleSchema = require("../validations/articleSchema");
const fetchMyProfile = require("../middlewares/fetchMyProfile");
const articleController = require("../controllers/articleController");
const optionalAuth = require("../middlewares/optionalAuth");

const router = express.Router();

router.post(
  "/",
  requiredAuth,
  fetchMyProfile,
  mongoUpload.single("img"),
  validator(articleSchema.createSchema),
  articleController.createAnArticle
);

router.put(
  "/:slug",
  requiredAuth,
  fetchMyProfile,
  mongoUpload.single("img"),
  validator(articleSchema.updateSchema),
  articleController.updateMyArticle
);

router.delete(
  "/:slug",
  requiredAuth,
  fetchMyProfile,
  articleController.deleteMyArticle
);

router.get("/:slug", articleController.getAnArticle);

router.get("/:slug/likes", articleController.getArticleLikes);

router.get("", articleController.getAllArticles);

module.exports = router;

import express from "express";
import articleController from "../controllers/articleController.js";
import requiredAuth from "../middlewares/requiredAuth.js";
import fetchMe from "../middlewares/fetchMe.js";
import authorize from "../middlewares/authorize.js";
import fetchUser from "../middlewares/fetchUser.js";
import checkUserBanned from "../middlewares/checkUserBanned.js";
import optionalAuth from "../middlewares/optionalAuth.js";
import articleSchema from "../validations/articleSchema.js";
import validator from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/",
  requiredAuth,
  fetchMe,
  validator(articleSchema.createArticleSchema, "body"),
  articleController.createArticle
);

router.get(
  "/following",
  requiredAuth,
  fetchMe,
  articleController.getFollowedProfilesArticles
);

router.get(
  "/explore-new-articles",
  requiredAuth,
  fetchMe,
  articleController.exploreNewArticles
);

router.get("/admin-pick", requiredAuth, fetchMe, articleController.adminPick);

router.get(
  "/admin-pick-full-list",
  requiredAuth,
  fetchMe,
  articleController.adminPickFullList
);

router.get(
  "/",
  requiredAuth,
  fetchMe,
  authorize("admin", "staff"),
  articleController.getAllArticles
);

router.get(
  "/:username/all",
  optionalAuth,
  fetchMe,
  fetchUser,
  checkUserBanned,
  articleController.getProfileArticles
);

router.get(
  "/topic/:slug",
  requiredAuth,
  fetchMe,
  articleController.getFollowedTopicArticles
);

router.patch(
  "/:id",
  requiredAuth,
  fetchMe,
  validator(articleSchema.updateArticleSchema, "body"),
  articleController.updateArticle
);

router.delete("/:id", requiredAuth, fetchMe, articleController.deleteArticle);

router.get("/:slug", optionalAuth, fetchMe, articleController.getAnArticle);

export default router;

import { Op } from "sequelize";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Block from "../models/mysql/Block.js";
import Profile from "../models/mysql/Profile.js";
import User from "../models/mysql/User.js";
import ErrorResponse from "../responses/ErrorResponse.js";
import addUrlToImg from "../utils/addUrlToImg.js";
import Follow_Profile from "../models/mysql/Follow_Profile.js";
import Mute from "../models/mysql/Mute.js";

// ==================== block a profile ==================== //
const blockAProfile = asyncMiddleware(async (req, res, next) => {
  const me = req.me;
  const user = req.user;

  if (user.profileInfo.id === me.profileInfo.id) {
    throw ErrorResponse(400, "You can not block your own profile");
  }

  const blocks = await Block.findOne({
    where: { blockedId: user.profileInfo.id, blockerId: me.profileInfo.id },
    attributes: ["id"],
  });

  if (!blocks) {
    await Promise.all([
      Block.create({
        blockedId: user.profileInfo.id,
        blockerId: me.profileInfo.id,
      }),
      Follow_Profile.destroy({
        where: {
          followedId: me.profileInfo.id,
          followerId: user.profileInfo.id,
        },
      }),
      Follow_Profile.destroy({
        where: {
          followedId: user.profileInfo.id,
          followerId: me.profileInfo.id,
        },
      }),
      Mute.destroy({
        where: {
          mutedId: user.profileInfo.id,
          muterId: me.profileInfo.id,
        },
      }),
      Mute.destroy({
        where: {
          mutedId: me.profileInfo.id,
          muterId: user.profileInfo.id,
        },
      }),
    ]);
  }

  res.status(201).json({
    success: true,
    message: `${user.profileInfo.fullname} has been blocked`,
  });
});

// ==================== unblock a profile ==================== //
const unBlockAProfile = asyncMiddleware(async (req, res, next) => {
  const me = req.me;
  const user = req.user;

  if (user.profileInfo.id === me.profileInfo.id) {
    throw ErrorResponse(400, "You can not unblock your own profile");
  }

  const blocks = await Block.findOne({
    where: { blockedId: user.profileInfo.id, blockerId: me.profileInfo.id },
    attributes: ["id"],
  });

  if (blocks) await blocks.destroy();

  res.json({
    success: true,
    message: `${user.profileInfo.fullname} has been unblocked`,
  });
});

// ==================== get list of blockd profiles ==================== //
const getBlockedProfiles = asyncMiddleware(async (req, res, next) => {
  const me = req.me;
  const { skip = 0, limit = 15 } = req.query;

  const blockedProfiles = await Block.findAll({
    where: { blockerId: me.profileInfo.id, id: { [Op.gt]: skip } },
    attributes: ["id"],
    include: {
      model: Profile,
      as: "blocked",
      attributes: ["id", "fullname", "avatar", "bio"],
      include: { model: User, as: "userInfo", attributes: ["username"] },
    },
    limit: Number(limit) ? Number(limit) : 15,
  });

  const blockeds = blockedProfiles.map((blockedProfile) => {
    return {
      id: blockedProfile.blocked.id,
      fullname: blockedProfile.blocked.fullname,
      avatar: addUrlToImg(blockedProfile.blocked.avatar),
      bio: blockedProfile.blocked.bio,
      username: blockedProfile.blocked.userInfo.username,
    };
  });

  const newSkip =
    blockedProfiles.length > 0
      ? blockedProfiles[blockedProfiles.length - 1].id
      : null;

  res.json({ success: true, data: blockeds, newSkip });
});

export default { blockAProfile, unBlockAProfile, getBlockedProfiles };
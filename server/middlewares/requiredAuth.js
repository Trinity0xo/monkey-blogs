const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const Token = require("../models/Token");

const requiredAuth = async (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken || !headerToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = headerToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const user = jwt.verify(token, env.SECRET_KEY);

    const tokenDoc = await Token.findOne({ userId: user.id, token });
    if (!tokenDoc) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = requiredAuth;
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const optionalAuth = async (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken || !headerToken.startsWith("Bearer ")) {
    req.jwtPayLoad = null;
    next();
    return;
  }

  const token = headerToken.split(" ")[1];
  if (!token) {
    req.jwtPayLoad = null;
    next();
    return;
  }

  try {
    const jwtPayLoad = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.jwtPayLoad = jwtPayLoad;
    next();
  } catch (error) {
    req.payload = null;
    next();
  }
};

export default optionalAuth;

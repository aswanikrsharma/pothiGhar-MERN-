import jwt from "jsonwebtoken";
import { JWTSECRET } from "../config/serverConfig.js";

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWTSECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user; // Assuming payload contains { id: <user_id>, ... }
    next();
  });
};

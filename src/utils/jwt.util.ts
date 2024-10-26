import jwt from "jsonwebtoken";
import {
  access_token_secret,
  refresh_token_secret,
} from "../config/jwt.config";
import { UserPayload } from "../types";

const generateAccessToken = (user: UserPayload) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, access_token_secret, { expiresIn: "1h" });
};

const generateRefreshToken = (user: UserPayload) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, refresh_token_secret, { expiresIn: "365d" });
};

export { generateAccessToken, generateRefreshToken };

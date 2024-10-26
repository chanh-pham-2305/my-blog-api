import jwt from "jsonwebtoken";
import { access_token_secret } from "../config/jwt.config";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth_header = req.cookies.Authorization;
    // console.log(auth_header);

    if (!auth_header) {
      return res.json({
        status: 401,
        message: "Unauthorized: Missing token.",
      });
    }
    const [bearer, token] = auth_header.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.json({
        status: 401,
        message: "Unauthorized: Invalid token format.",
      });
    }

    jwt.verify(token, access_token_secret, (err: any, user: any) => {
      if (err) {
        return res.json({
          status: 401,
          message: "Forbidden: Invalid token.",
        });
      }

      // console.log(user);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: error,
    });
  }
};

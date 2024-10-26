import { Request, Response } from "express";

import { createUser, loginUser } from "../services/auth.service";

const register = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  if (email && password && username) {
    const new_user = await createUser({ email, password, username });
    console.log(new_user);
    return res.json(new_user);
  } else {
    return res.json({
      status: 401,
      message: "The email, password and name is required",
    });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    return res
      .cookie("Authorization", "Bearer " + response.token.access_token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: true,
      })
      .json(response);
  } catch (error) {
    //return error message
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const logout = async (req: Request, res: Response): Promise<any> => {
  return res
    .clearCookie("Authorization")
    .json({ status: 200, message: "logout successfully" });
};

export { register, login, logout };

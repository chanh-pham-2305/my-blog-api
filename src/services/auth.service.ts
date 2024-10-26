import { User } from "../models/User.model";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import { UserRegister } from "../types";

const salt = bcrypt.genSaltSync(10);

const createUser = async (user: UserRegister) => {
  const { username, email, password } = user;
  try {
    const isCheckEmail = await User.find({ email });
    const isCheckName = await User.find({ username });

    if (isCheckEmail.length || isCheckName.length) {
      return {
        status: 401,
        message: "The email or user name is existed.",
      };
    }
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return {
      status: 200,
      message: "created user successfully.",
      user: createdUser,
    };
  } catch (error) {
    return {
      status: 400,
      message: error,
    };
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    //check email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return {
        status: 401,
        message: "User not found.",
      };
    }

    //check password
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Password incorrect.",
      };
    }

    //create access_token and refresh_token
    const access_token = generateAccessToken(existingUser);
    const refresh_token = generateRefreshToken(existingUser);

    return {
      status: 201,
      message: "Login successfully.",
      token: {
        access_token,
        refresh_token,
      },
    };

    //return error
  } catch (error) {
    return {
      status: 401,
      message: error,
    };
  }
};

export { createUser, loginUser };

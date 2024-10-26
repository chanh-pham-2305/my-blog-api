import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  password: string;
  email: string;
  verified: boolean;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      min: [6, "Username must have 6 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      min: [6, "Email must have 6 characters."],
    },
    password: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      min: [6, "Email must have 6 characters."],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
const User = model("User", UserSchema);

export { IUser,User };

import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async (MONGO_URI: string) => {
  await mongoose
    .connect(MONGO_URI)
    .then((res) => {
      console.log("Connect to DB successfully.");
    })
    .catch((error) => console.log("Connect to DB fail: " + error.message));
};

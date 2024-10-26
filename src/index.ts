import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route";
import PostRouter from "./routes/post.route";
dotenv.config();

import { connectDB } from "./config/db.config";
const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

connectDB(process.env.MONGODB_URI);

app.use("/v1/auth/", AuthRouter);
app.use("/v1/p/", PostRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

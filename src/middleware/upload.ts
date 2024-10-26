import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  filename: function (req: any, file, cb) {
    const _id = req.user._id;
    console.log({
      _id,
      file,
    });

    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.APP_CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.APP_CLOUDINARY_SECRET_KEY,
});

export const uploadMultiple = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const images = req.files;
    const imageUrls = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      imageUrls.push(result.secure_url);
    }

    req.body.urlImages = imageUrls;
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Internal error at Upload middleware",
    });
  }
};

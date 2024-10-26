import { Schema, model } from "mongoose";

interface IPost {
  title: string;
  description: string;
  urlImages: string[];
  author: Object;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required!"],
      trim: true,
    },
    urlImages: {
      type: [String],
      required: [true, "description is required!"],
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const Post = model("Post", PostSchema);
export { Post };

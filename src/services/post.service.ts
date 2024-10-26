import { PostCreated, PostUpdated } from "../types";
import { Post } from "../models/Post.model";

const createPostService = async (userId: Object, post: PostCreated) => {
  const { title, description, urlImages } = post;

  try {
    if (!title || !description || !urlImages) {
      throw new Error("Must have 3 field title, description and image.");
    }
    const created_post = await Post.create({
      title,
      description,
      urlImages,
      author: userId,
    });

    return created_post;
  } catch (error) {
    throw new Error(error);
  }
};

const getPostsService = async () => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailPostService = async (_id: Object) => {
  try {
    const post = await Post.findById({ _id });
    if (!post) {
      throw new Error("post not found");
    }
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

const updatePostService = async (_id: Object, post: PostUpdated) => {
  const { title, description, urlImages } = post;
  try {
    const existingPost = Post.findById({ _id });
    if (!existingPost) {
      throw new Error("Post not exist.");
    }
    if (!title || !description || !urlImages) {
      throw new Error("Must have 3 field title, description and image.");
    }
    const updated_post = await Post.findByIdAndUpdate(
      { _id },
      {
        title,
        description,
        urlImages,
      },
      { new: true }
    );

    return updated_post;
  } catch (error) {
    throw new Error(error);
  }
};

const deletePostService = async (_id: Object) => {
  try {
    const existingPost = await Post.findOne({ _id });
    if (!existingPost) {
      throw new Error("Post already unavailable.");
    }

    const deleted_post = await Post.deleteOne({ _id });
    return deleted_post;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createPostService,
  getPostsService,
  getDetailPostService,
  updatePostService,
  deletePostService,
};

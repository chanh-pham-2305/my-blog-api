import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  getDetailPostService,
  getPostsService,
  updatePostService,
} from "../services/post.service";

const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await getPostsService();
    return res.status(200).json({
      success: "OK",
      message: "[200]: Get all post successfully.",
      posts,
    });
  } catch (error) {
    return res.status(401).json({
      success: "fail",
      message: error,
    });
  }
};
const createPost = async (req: Request | any, res: Response): Promise<any> => {
  const { title, description, urlImages } = req.body;
  const { id } = req.user;

  try {
    const created_post = await createPostService(id, {
      title,
      description,
      urlImages,
    });

    return res.status(201).json({
      success: "OK",
      message: "[201]: create post successfully.",
      created_post,
    });
  } catch (error) {
    return res.status(401).json({
      success: "fail",
      message: error,
    });
  }
};
const getPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { _id } = req.query;
    const post = await getDetailPostService(_id);
    return res.status(200).json({
      success: "OK",
      message: "[200]: get post successfully.",
      post,
    });
  } catch (error) {
    return res.status(401).json({
      success: "fail",
      message: error,
    });
  }
};
const updatePost = async (req: Request, res: Response): Promise<any> => {
  const { title, description, urlImages } = req.body;
  const { _id } = req.query;
  try {
    const updated_post = await updatePostService(_id, {
      title,
      description,
      urlImages,
    });
    return res.status(200).json({
      success: "OK",
      message: "[200]: Updated post successfully.",
      updated_post,
    });
  } catch (error) {
    return res.status(401).json({
      success: "fail",
      message: error,
    });
  }
};
const deletePost = async (req: Request, res: Response): Promise<any> => {
  const { _id } = req.query;
  try {
    const deleted_post = await deletePostService(_id);
    return res.status(200).json({
      success: "OK",
      message: "[200]: Delete post successfully.",
      deleted_post,
    });
  } catch (error) {
    return res.status(401).json({
      success: "fail",
      message: error,
    });
  }
};

export { getPosts, createPost, getPost, updatePost, deletePost };

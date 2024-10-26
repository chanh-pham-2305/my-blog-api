import { Router } from "express";
import { upload, uploadMultiple } from "../middleware/upload";
import { authenticateToken } from "../middleware/auth";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

const router = Router();

router.get("/", getPosts);
router.post(
  "/create",
  authenticateToken as any,
  upload.array("images"),
  uploadMultiple,
  createPost
);
router.get("/:id", authenticateToken as any, getPost);
router.put("/:id", authenticateToken as any, updatePost);
router.delete("/:id", authenticateToken as any, deletePost);

export default router;

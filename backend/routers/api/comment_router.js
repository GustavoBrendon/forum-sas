import { createComment, getCommentsByPostId, deleteComment } from "../../controllers/comment_controller.js";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";

const commentRouter = Router();

commentRouter.get("/:postId", getCommentsByPostId);

commentRouter.post("/", authMiddleware, createComment);

commentRouter.delete("/:id", authMiddleware, deleteComment);

export default commentRouter;

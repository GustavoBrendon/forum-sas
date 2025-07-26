import { createPost, getPosts, editPost, deletePost } from "../../controllers/post_controller.js";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";

const postRouter = Router();
postRouter.get("/", getPosts);
postRouter.post("/", authMiddleware, createPost);
postRouter.put("/edit/:id", authMiddleware, editPost);
postRouter.delete("/:id", authMiddleware, deletePost);

export default postRouter;

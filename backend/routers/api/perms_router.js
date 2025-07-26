import { createPerm, getPerms, editPerm, deletePerm } from "../../controllers/perms_controller.js";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";
import adminMiddleware from "../../middleware/admin.js";

const permsRouter = Router();

permsRouter.use(authMiddleware, adminMiddleware);

permsRouter.post("/", createPerm);
permsRouter.get("/", getPerms);
permsRouter.put("/:id", editPerm);
permsRouter.delete("/:id", deletePerm);

export default permsRouter;

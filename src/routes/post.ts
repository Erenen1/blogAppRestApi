import express from "express"
const router = express.Router();
import { getPosts, getPost, deletePost, updatePost, createPosts } from "../controller/post"
import { authentication } from "../middlewares/authentication";
import { postAuthorization } from "../middlewares/authorization";

router.get("/:postId", getPost)
router.put("/:postId", authentication, postAuthorization, updatePost)
router.delete("/:postId", authentication, postAuthorization, deletePost)
router.get("/", getPosts);
router.post("/", authentication, createPosts);

export default router; 
import express from "express"
const router = express.Router();
import { getComment, getComments, updateComment, deleteComment, createComments } from "../controller/comment"
import { authentication } from "../middlewares/authentication";
import { commentAuthorization } from "../middlewares/authorization";

router.get("/:commentId", getComment)
router.put("/:commentId", authentication, commentAuthorization, updateComment)
router.delete("/:commentId", authentication, commentAuthorization, deleteComment)
router.get("/", getComments);
router.post("/:postId", authentication, createComments);

export default router;
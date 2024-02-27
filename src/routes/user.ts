import express from "express"
const router = express.Router();
import { getAllUsers, deleteUser, updateUser, getUser } from "../controller/user"
import { authentication, isAdmin } from "../middlewares/authentication"
import { userAuthorization } from "../middlewares/authorization";

router.get("/:userId", authentication, userAuthorization, getUser)
router.put("/:userId", authentication, userAuthorization, updateUser)
router.delete("/:userId", authentication, userAuthorization, deleteUser)
router.get("/", isAdmin, getAllUsers);


export default router;
import express from "express"
const router = express.Router();
import { getCategory, getCategories, updateCategory, deleteCategory, createCategory } from "../controller/category"
import { isAdmin } from "../middlewares/authentication";


router.get("/:categoryId", getCategory)
router.put("/:categoryId", isAdmin, updateCategory)
router.delete("/:categoryId", isAdmin, deleteCategory)
router.get("/", getCategories);
router.post("/", isAdmin, createCategory);


export default router;
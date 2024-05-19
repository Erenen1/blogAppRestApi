import express from "express";
import { getAllCategorys, getCategoryById, deleteCategoryById, updateCategoryById, createCategories } from "../db/models/categories"
import { validateCategory, validateId } from "../helpers/validation"

export const getCategories = async (req: express.Request, res: express.Response) => {
    try {
        const categories = await getAllCategorys();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const getCategory = async (req: express.Request, res: express.Response) => {
    const categoryId = req.params.categoryId;
    const { error } = validateId(categoryId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const category = await getCategoryById(categoryId);
        return res.status(200).json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const updateCategory = async (req: express.Request, res: express.Response) => {
    const categoryId = req.params.categoryId;
    const { error } = validateId(categoryId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    const { name } = req.body
    try {
        const { error } = validateCategory(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        await updateCategoryById(categoryId, { name })
        return res.status(200).json({ success: true, message: "Kategori başarıyla güncellendi" })

    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const deleteCategory = async (req: express.Request, res: express.Response) => {
    const categoryId = req.params.categoryId;
    const { error } = validateId(categoryId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        await deleteCategoryById(categoryId);
        return res.status(200).json({ success: true, message: "Kategori başarıyla silindi." })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Kategori silinemedi." })
    }
}

export const createCategory = async (req: express.Request, res: express.Response) => {
    const { name } = req.body;
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const category = await createCategories({ name });
        return res.status(201).json({ success: true, message: "Kategori başarıyla oluşturuldu.", category: category })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Kategori oluşturulamadı." })
    }
}



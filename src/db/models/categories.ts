import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true },
})

export const Category = mongoose.model("categories", categorySchema);

export const getAllCategorys = () => Category.find();
export const getCategoryById = (categoryId: string) => Category.findOne({ _id: categoryId })
export const deleteCategoryById = (categoryId: string) => Category.findByIdAndDelete(categoryId);
export const updateCategoryById = (categoryId: string, values: Record<string, any>) => Category.findByIdAndUpdate(categoryId, values)
export const createCategories = (values: Record<string, any>) => new Category(values).save().then((category) => category.toObject());
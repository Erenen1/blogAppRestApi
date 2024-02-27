import express from "express";
import { getAllPosts, getPostById, deletePostById, updatePostById, createPost,getPostsByIdWithComments } from "../db/models/post"
import { validatePostsInputs, validateId } from "../helpers/validation"

export const getPosts = async (req: express.Request, res: express.Response) => {
    try {
        const posts = await getAllPosts();
        return res.status(200).json({ success: true, message: "Postlar başarıyla getirildi.", posts: posts })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Postlar getirilemedi." })
    }
}

export const getPost = async (req: express.Request, res: express.Response) => {
    const postId = req.params.postId;
    const { error } = validateId(postId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const post = await getPostsByIdWithComments(postId);
        if (!post) {
            return res.status(400).json({ success: false, message: "Post bulunamadı." })
        }
        return res.status(200).json({ success: true, message: "Post bulundu.", post: post })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Post getirilemedi." })

    }
}

export const updatePost = async (req: express.Request, res: express.Response) => {
    const postId = req.params.postId;
    const { title, content, image } = req.body;
    const { error } = validateId(postId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const { error } = validatePostsInputs(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const updatedValues = { title, content, image };
        await updatePostById(postId, updatedValues);
        return res.status(200).json({ success: true, message: "Post başarıyla güncellendin" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Post güncellenemedi." })
    }
}

export const deletePost = async (req: express.Request, res: express.Response) => {
    const postId = req.params.postId;
    const { error } = validateId(postId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {

        await deletePostById(postId);
        return res.status(200).json({ success: true, message: "Post başarıyla silindi" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Post silinemedi." })
    }
}
export const createPosts = async (req: express.Request, res: express.Response) => {
    const { title, content, image } = req.body;
    try {
        const { error } = validatePostsInputs(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const userId = (req as any).jwtToken.userId;
        const values = { title, content, image, userId };
        const post = await createPost(values);
        return res.status(201).json({ success: true, message: "Post başarıyla oluşturuldu.", post: post })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Post oluşturulamadı." })
    }
}
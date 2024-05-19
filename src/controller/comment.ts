import express from "express";
import { getAllComments, getCommentById, deleteCommentById, updateCommentById, createComment } from "../db/models/comments"
import { validateComment, validateId } from "../helpers/validation"
import { getPostById,Post } from "../db/models/post";

export const getComments = async (req: express.Request, res: express.Response) => {
    try {
        const comments = await getAllComments()
        return res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Comment getirilemedi." })
    }
}

export const getComment = async (req: express.Request, res: express.Response) => {
    const commentId = req.params.commentId;
    const { error } = validateId(commentId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(400).json({ success: false, message: "Comment bulunamadı." })
        }
        return res.status(200).json({ success: true, message: "Comment bulundu.", comment: comment })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Comment getirilemedi." })

    }
}

export const updateComment = async (req: express.Request, res: express.Response) => {
    const commentId = req.params.commentId;
    const { content } = req.body;
    const { error } = validateId(commentId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const { error } = validateComment(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const updatedValues = { content };
        await updateCommentById(commentId, updatedValues);
        return res.status(200).json({ success: true, message: "Comment başarıyla güncellendin" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Comment güncellenemedi." })
    }
}

export const deleteComment = async (req: express.Request, res: express.Response) => {
    const commentId = req.params.commentId;
    const { error } = validateId(commentId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        await deleteCommentById(commentId);
        return res.status(200).json({ success: true, message: "Comment başarıyla silindi" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Comment silinemedi." })
    }
}

export const createComments = async (req: express.Request, res: express.Response) => {
    const postId = req.params.postId;
    const { title, content, image } = req.body;
    try {
        const { error } = validateComment(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const userId = (req as any).jwtToken.userId;
        const values = { title, content, image, userId, postId };
        const comment = await createComment(values);

        const post = await getPostById(postId)
        if(!post){
            return res.status(400).json({success:false,message:"Bu id'ye sahip bir post yok"});
        }

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({ success: true, message: "Comment başarıyla oluşturuldu.", comment: comment })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Comment oluşturulamadı." })
    }
}
import { getCommentById } from "../db/models/comments";
import { getPostById,Post } from "../db/models/post";
import express from "express"

export const userAuthorization = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req as any).jwtToken.isAdmin) {
        return next();
    }
    const userId = req.params.userId;
    if ((req as any).jwtToken.userId !== userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    next()
}

export const postAuthorization = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req as any).jwtToken.isAdmin) {
        return next();
    }
    const postId = req.params.postId;
    const post= await getPostById(postId);
    if(!post){
        return res.status(400).json({success:false,message:"Bu id'ye sahip bir post yok"})
    }
    const userId = (post as any).userId.toString();
    if ((req as any).jwtToken.userId !== userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    next()
}

export const commentAuthorization = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req as any).jwtToken.isAdmin) {
        return next();
    }
    const commentId = req.params.commentId;
    const comment = await getCommentById(commentId);
    if(!comment){
        return res.status(400).json({success:false,message:"Bu id'ye sahip yorum yok."})
    }
    const userId = (comment as any).userId.toString();
    if ((req as any).jwtToken.userId !== userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    next()
}


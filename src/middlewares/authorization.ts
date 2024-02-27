import { getCommentById } from "../db/models/comments";
import { getPostById } from "../db/models/post";
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
    const post = await getPostById(postId);
    const userId = post.userId.toString();
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
    const userId = comment.userId.toString();
    if ((req as any).jwtToken.userId !== userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    next()
}


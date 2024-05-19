import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },
    userId: { type: Schema.Types.ObjectId, ref: "Users" }
}, { timestamps: true })

export const Comment = mongoose.model("Comments", commentSchema);

export const getAllComments = () => Comment.find();
export const getCommentById = (CommentId: string) => Comment.findOne({ _id: CommentId })
export const deleteCommentById = (CommentId: string) => Comment.findByIdAndDelete(CommentId);
export const updateCommentById = (CommentId: string, values: Record<string, any>) => Comment.findByIdAndUpdate(CommentId, values)
export const createComment = (values: Record<string, any>) => new Comment(values).save().then((Comment) => Comment.toObject());
export const getCommentsByUserId = (userId: string) => Comment.find({ userId: userId })
export const getCommentsByPostId = (postId:string) => Comment.findOne({})
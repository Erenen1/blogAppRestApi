import mongoose from "mongoose";
import { Schema } from "mongoose";


const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
}, { timestamps: true })

export const Post = mongoose.model("Posts", postSchema);

export const getAllPosts = () => Post.find();
export const getPostById = (postId: string) => Post.findOne({ _id: postId })
export const deletePostById = (postId: string) => Post.findByIdAndDelete(postId);
export const updatePostById = (postId: string, values: Record<string, any>) => Post.findByIdAndUpdate(postId, values)
export const createPost = (values: Record<string, any>) => new Post(values).save().then((post) => post.toObject());
export const getPostsByUserId = (userId: string) => Post.find({ userId: userId })
export const getPostsByIdWithComments = (postId: string) => Post.findOne({ _id: postId }).populate("comments")
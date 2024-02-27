import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true })

export const User = mongoose.model("Users", userSchema);


export const getUsers = () => User.find();
export const getUserById = (userId: string) => User.findOne({ _id: userId })
export const getUserByEmail = (userEmail: string) => User.findOne({ email: userEmail })
export const updateUserById = (userId: string, values: Record<string, any>) => User.findByIdAndUpdate(userId, values)
export const deleteUserById = (userId: string) => User.findByIdAndDelete(userId);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject())
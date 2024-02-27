import mongoose from "mongoose";

export async function connectDb (){
    try {
        await mongoose.connect('mongodb://localhost:27017/blogapp');
        console.log("baglanti basarili")
    } catch (error) {
        console.log(error);
    }
} 

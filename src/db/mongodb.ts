import mongoose from "mongoose";
import { config } from "../config"

export async function connectDb() {
    try {
        await mongoose.connect(config.DB_HOST!);
        console.log("baglanti basarili");
    } catch (error) {
        console.log(error);
    }
}
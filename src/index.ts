import express from "express"
const app = express();
import cors from "cors"
import env from "dotenv";
env.config();

import { connectDb } from "./db/mongodb";


import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import postRoutes from "./routes/post"
import commentRoutes from "./routes/comments"
import categoryRoutes from "./routes/category"


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

connectDb();

app.listen(3000, () => {
    console.log("http://localhost:3000 üzerinden calisiyor...")
})
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blog.routes";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

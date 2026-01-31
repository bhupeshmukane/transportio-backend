import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/uploads", express.static("uploads"));


app.get("/", (_req, res) => {
  res.send("Logistics Blog API Running...");
});

export default app;

import { Router } from "express";
import {
  getAllBlogs,
  adminGetBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// PUBLIC ROUTES
router.get("/", getAllBlogs);

// ADMIN ROUTES — MUST COME BEFORE :slug
router.get("/admin", authenticate, adminGetBlogs);

router.get("/id/:id", authenticate, getBlogById);

// SLUG ROUTE — MUST COME LAST
router.get("/slug/:slug", getBlogBySlug);

// CRUD
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);



export default router;

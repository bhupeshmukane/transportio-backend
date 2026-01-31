import { Request, Response } from "express";
import prisma from "../config/db";

export const getAllBlogs = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 6);

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blog.count({ where: { published: true } }),
  ]);

  res.json({
    blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
};



export const adminGetBlogs = async (req: Request, res: Response) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(blogs);
};

export const getBlog = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) return res.status(404).json({ message: "Not found" });

  res.json(blog);
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};


export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};


export const createBlog = async (req: Request, res: Response) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { title, slug, content, thumbnail, published } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        thumbnail,
        published,
        author: {
          connect: { id: req.user.id },
        },
      },
    });

    return res.status(201).json(blog);
  } catch (error: any) {
    console.error("CREATE BLOG ERROR:", error);
    return res.status(500).json({
      message: "Blog creation failed",
      error: error.message,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const blog = await prisma.blog.update({
    where: { id },
    data: req.body,
  });

  res.json(blog);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.blog.delete({ where: { id } });

  res.json({ message: "Deleted successfully" });
};

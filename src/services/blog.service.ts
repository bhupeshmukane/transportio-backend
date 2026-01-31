import prisma from "../config/db";

export async function createBlog(data: any) {
  return prisma.blog.create({ data });
}

export async function getAllBlogs() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

export async function updateBlog(id: number, data: any) {
  return prisma.blog.update({ where: { id }, data });
}

export async function deleteBlog(id: number) {
  return prisma.blog.delete({ where: { id } });
}

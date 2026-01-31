import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "supersecurejwtkey",
    { expiresIn: "7d" }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

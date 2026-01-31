import prisma from "../config/db";
import bcrypt from "bcrypt";

async function seed() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@logistics.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("Admin user created");
}

seed()
  .catch(console.error)
  .finally(() => process.exit());

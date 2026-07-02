import { prisma } from "@/lib/db";
import { randomUUID } from "crypto";

interface CreateUserRequest {
  name: string;
  email: string;
}

export async function createUser(data: CreateUserRequest) {
  return prisma.user.create({
    data: {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      emailVerified: false,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
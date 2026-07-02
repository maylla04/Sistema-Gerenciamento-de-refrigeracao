import { prisma } from "@/lib/db";

interface CreateUserRequest {
  name: string;
  email: string;
}

export async function createUser(data: CreateUserRequest) {
  return prisma.user.create({
    data,
  });
}
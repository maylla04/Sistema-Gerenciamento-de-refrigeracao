import { FastifyInstance } from "fastify"
import { z } from "zod";
import { prisma } from "@/lib/db"
import { createUser } from "@/usecases/users/create-user";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", async () => {
    return prisma.user.findMany()
  })

  app.get("/users/:id", async (request) => {
    const { id } = request.params as {
      id: string
    }

    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  })
  app.post("/users", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const body = bodySchema.parse(request.body);

    const user = await createUser(body);

    return reply.status(201).send(user);
  });
 // Atualizar usuário
  app.put("/users/:id", async (request) => {
    const { id } = request.params as { id: string };

    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const body = bodySchema.parse(request.body);

    return prisma.user.update({
      where: { id },
      data: body,
    });
  });

  // Excluir usuário
  app.delete("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    await prisma.user.delete({
      where: { id },
    });

    return reply.status(204).send();
  });
}
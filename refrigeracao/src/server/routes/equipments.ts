import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const equipmentRoutes: FastifyPluginAsync = async (app) => {
  // Listar todos os equipamentos
  app.get("/equipments", async () => {
    return prisma.equipment.findMany({
      include: {
        user: true,
        manutencoes: true,
      },
    });
  });

  // Buscar equipamento por ID
  app.get("/equipments/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: {
        user: true,
        manutencoes: true,
      },
    });

    if (!equipment) {
      return reply.status(404).send({
        message: "Equipamento não encontrado.",
      });
    }

    return equipment;
  });

  // Cadastrar equipamento
  app.post("/equipments", async (request, reply) => {
    const bodySchema = z.object({
      nome: z.string(),
      modelo: z.string(),
      localizacao: z.string(),
      userId: z.string(),
    });

    const body = bodySchema.parse(request.body);

    const equipment = await prisma.equipment.create({
      data: body,
    });

    return reply.status(201).send(equipment);
  });

  // Atualizar equipamento
  app.put("/equipments/:id", async (request, reply) => {
     const { id } = request.params as { id: string };


    const bodySchema = z.object({
      nome: z.string(),
      modelo: z.string(),
      localizacao: z.string(),
    });

    const body = bodySchema.parse(request.body);

    const equipment = await prisma.equipment.update({
      where: { id },
      data: body,
    });

    return equipment;
  });

  // Excluir equipamento
  app.delete("/equipments/:id", async (request, reply) => {
     const { id } = request.params as { id: string };

    await prisma.equipment.delete({
      where: { id },
    });

    return reply.status(204).send();
  });
};
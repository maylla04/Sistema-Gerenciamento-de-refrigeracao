import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/db";

const paramsSchema = z.object({
  id: z.string().min(1),
});

const createEquipmentSchema = z.object({
  nome: z.string().min(1),
  modelo: z.string().min(1),
  localizacao: z.string().min(1),
  userId: z.string().min(1),
});

const updateEquipmentSchema = z.object({
  nome: z.string().min(1),
  modelo: z.string().min(1),
  localizacao: z.string().min(1),
});

export const equipmentRoutes: FastifyPluginAsync = async (app) => {
  app.get("/equipments", async () => {
    return prisma.equipment.findMany({
      include: {
        user: true,
        manutencoes: true,
      },
    });
  });

  app.get("/equipments/:id", async (request, reply) => {
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

  app.post("/equipments", async (request, reply) => {
    const body = createEquipmentSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { id: body.userId },
    });

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado.",
      });
    }

    const equipment = await prisma.equipment.create({
      data: body,
    });

    return reply.status(201).send(equipment);
  });

  app.put("/equipments/:id", async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);
    const body = updateEquipmentSchema.parse(request.body);

    const equipmentExists = await prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipmentExists) {
      return reply.status(404).send({
        message: "Equipamento não encontrado.",
      });
    }

    const equipment = await prisma.equipment.update({
      where: { id },
      data: body,
    });

    return equipment;
  });

  app.delete("/equipments/:id", async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);

    const equipmentExists = await prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipmentExists) {
      return reply.status(404).send({
        message: "Equipamento não encontrado.",
      });
    }

    await prisma.equipment.delete({
      where: { id },
    });

    return reply.status(204).send();
  });
};
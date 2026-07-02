import { FastifyPluginAsync } from "fastify";
import { prisma } from "@/lib/db";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().min(1),
});

const createMaintenanceSchema = z.object({
  descricao: z.string().min(1),
  data: z.coerce.date(),
  equipmentId: z.string().min(1),
});

const updateMaintenanceSchema = z.object({
  descricao: z.string().min(1),
  data: z.coerce.date(),
});

export const maintenanceRoutes: FastifyPluginAsync = async (app) => {
  app.get("/maintenances", async () => {
    return prisma.maintenance.findMany({
      include: {
        equipment: true,
      },
    });
  });

  app.get("/maintenances/:id", async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);

    const maintenance = await prisma.maintenance.findUnique({
      where: { id },
      include: {
        equipment: true,
      },
    });

    if (!maintenance) {
      return reply.status(404).send({
        message: "Manutenção não encontrada.",
      });
    }

    return maintenance;
  });

  app.post("/maintenances", async (request, reply) => {
    const body = createMaintenanceSchema.parse(request.body);

    const equipment = await prisma.equipment.findUnique({
      where: { id: body.equipmentId },
    });

    if (!equipment) {
      return reply.status(404).send({
        message: "Equipamento não encontrado.",
      });
    }

    const maintenance = await prisma.maintenance.create({
      data: body,
    });

    return reply.status(201).send(maintenance);
  });

  app.put("/maintenances/:id", async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);
    const body = updateMaintenanceSchema.parse(request.body);

    const maintenanceExists = await prisma.maintenance.findUnique({
      where: { id },
    });

    if (!maintenanceExists) {
      return reply.status(404).send({
        message: "Manutenção não encontrada.",
      });
    }

    const maintenance = await prisma.maintenance.update({
      where: { id },
      data: body,
    });

    return maintenance;
  });

  app.delete("/maintenances/:id", async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);

    const maintenanceExists = await prisma.maintenance.findUnique({
      where: { id },
    });

    if (!maintenanceExists) {
      return reply.status(404).send({
        message: "Manutenção não encontrada.",
      });
    }

    await prisma.maintenance.delete({
      where: { id },
    });

    return reply.status(204).send();
  });
};
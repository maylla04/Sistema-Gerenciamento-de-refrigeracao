import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/db"
import { z } from "zod";

export async function maintenanceRoutes(app: FastifyInstance) {
  //listar manutenções
  app.get("/maintenances", async () => {
  return prisma.maintenance.findMany({
    include: {
      equipment: true,
    },
  });
});
//buscar por ID
app.get("/maintenances/:id", async (request) => {
  const { id } = request.params as { id: string };

  return prisma.maintenance.findUnique({
    where: { id },
    include: {
      equipment: true,
    },
  });
});

//cadastrar
app.post("/maintenances", async (request, reply) => {
  const bodySchema = z.object({
    descricao: z.string(),
    data: z.coerce.date(),
    equipmentId: z.string(),
  });

  const body = bodySchema.parse(request.body);

  const maintenance = await prisma.maintenance.create({
    data: body,
  });

  return reply.status(201).send(maintenance);
});
app.put("/maintenances/:id", async (request) => {
  const { id } = request.params as { id: string };

  const bodySchema = z.object({
    descricao: z.string(),
    data: z.coerce.date(),
  });

  const body = bodySchema.parse(request.body);

  return prisma.maintenance.update({
    where: { id },
    data: body,
  });
});
app.delete("/maintenances/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  await prisma.maintenance.delete({
    where: { id },
  });

  return reply.status(204).send();
});
}
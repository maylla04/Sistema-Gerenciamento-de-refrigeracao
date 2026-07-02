import { FastifyPluginAsync } from "fastify";
import { prisma } from "@/lib/db";

export const dashboardRoutes: FastifyPluginAsync = async (app) => {
  app.get("/dashboard", async () => {
    const hoje = new Date();

    const proximos30Dias = new Date();
    proximos30Dias.setDate(hoje.getDate() + 30);

    const totalEquipments = await prisma.equipment.count();

    const totalMaintenances = await prisma.maintenance.count();

    const manutencoesVencidas = await prisma.maintenance.count({
      where: {
        data: {
          lt: hoje,
        },
      },
    });

    const proximasManutencoes = await prisma.maintenance.count({
      where: {
        data: {
          gte: hoje,
          lte: proximos30Dias,
        },
      },
    });

    const ultimasManutencoes = await prisma.maintenance.findMany({
      take: 5,
      orderBy: {
        data: "desc",
      },
      include: {
        equipment: true,
      },
    });

    return {
      totalEquipments,
      totalMaintenances,
      manutencoesVencidas,
      proximasManutencoes,
      ultimasManutencoes,
    };
  });
};
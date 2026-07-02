import Fastify from "fastify";
import swagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import { dashboardRoutes } from "./routes/dashboard";
import { userRoutes } from "./routes/users";
import { equipmentRoutes } from "./routes/equipments";
import { maintenanceRoutes } from "./routes/maintenances";

async function start() {
  const app = Fastify();

  await app.register(swagger, {
    openapi: {
      info: {
        title: "AC Manager API",
        description: "API REST para gerenciamento de equipamentos e manutenções de refrigeração",
        version: "1.0.0",
      },
    },
  });

  await app.register(fastifyApiReference, {
    routePrefix: "/docs",
  });

  app.get("/", async () => {
    return {
      message: "API Sistema de Refrigeração",
    };
  });

  app.register(userRoutes);
  app.register(equipmentRoutes);
  app.register(maintenanceRoutes);
  app.register(dashboardRoutes);
  
  await app.listen({ port: 8080 });

  console.log("Servidor rodando em http://localhost:8080");
  console.log("Docs em http://localhost:8080/docs");
}

start();
import Fastify from "fastify";

import { userRoutes } from "./routes/users";
import { equipmentRoutes } from "./routes/equipments";
import { maintenanceRoutes } from "./routes/maintenances";

async function start() {
  const app = Fastify();

  app.register(userRoutes);
  app.register(equipmentRoutes);
  app.register(maintenanceRoutes);

  await app.listen({
    port: 8080,
  });

  console.log("Servidor rodando em http://localhost:8080");
}

start();
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./router";
import { createContext } from "./trpc";

const PORT = parseInt(process.env.API_PORT ?? "3001", 10);

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: cors({
    origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    credentials: true,
  }),
});

server.listen(PORT);

console.log(`🐾 PetPulse API server running on http://localhost:${PORT}`);

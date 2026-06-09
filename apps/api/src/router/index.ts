import { router } from "../trpc";
import { authRouter } from "./auth";
import { petsRouter } from "./pets";
import { scansRouter } from "./scans";
import { uploadRouter } from "./upload";

export const appRouter = router({
  auth: authRouter,
  pets: petsRouter,
  scans: scansRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;

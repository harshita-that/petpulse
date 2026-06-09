import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import superjson from "superjson";
import { createAdminClient } from "@petpulse/db";
import type { User } from "@petpulse/types";

/**
 * Creates the tRPC context for each request.
 * Extracts the Authorization Bearer token, verifies the JWT via Supabase,
 * and attaches the authenticated user to the context.
 */
export async function createContext({ req }: CreateHTTPContextOptions) {
  const supabase = createAdminClient();

  const authHeader = req.headers.authorization;
  let user: User | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);

    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser(token);

    if (!error && authUser) {
      // Fetch the user profile from our users table
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profile) {
        user = profile as User;
      }
    }
  }

  return { user, supabase };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * tRPC initialization with superjson transformer for proper
 * serialization of dates, Maps, Sets, etc.
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Auth middleware — ensures the user is authenticated before
 * allowing access to protected procedures.
 */
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // Now guaranteed non-null
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);

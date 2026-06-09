import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";
import { updateProfileSchema } from "@petpulse/types";
import type { Database } from "@petpulse/db";

type UsersUpdate = Database["public"]["Tables"]["users"]["Update"];

export const authRouter = router({
  /**
   * Returns the current authenticated user's profile.
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("users")
      .select("*")
      .eq("id", ctx.user.id)
      .single();

    if (error || !data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User profile not found",
      });
    }

    return data;
  }),

  /**
   * Updates the current user's profile (name and/or avatar_url).
   */
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const updateData: UsersUpdate = {};
      if (input.name !== undefined) updateData.name = input.name;
      if (input.avatar_url !== undefined) updateData.avatar_url = input.avatar_url;

      const { data, error } = await ctx.supabase
        .from("users")
        .update(updateData)
        .eq("id", ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to update profile: ${error.message}`,
        });
      }

      return data;
    }),
});

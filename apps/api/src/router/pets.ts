import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";
import { createPetSchema, updatePetSchema } from "@petpulse/types";
import type { Database } from "@petpulse/db";

type PetsInsert = Database["public"]["Tables"]["pets"]["Insert"];
type PetsUpdate = Database["public"]["Tables"]["pets"]["Update"];

export const petsRouter = router({
  /**
   * Creates a new pet profile for the authenticated user.
   */
  create: protectedProcedure
    .input(createPetSchema)
    .mutation(async ({ ctx, input }) => {
      const insertData: PetsInsert = {
        user_id: ctx.user.id,
        name: input.name,
        breed: input.breed ?? null,
        age: input.age ?? null,
        weight: input.weight ?? null,
        sex: input.sex ?? null,
        color: input.color ?? null,
        conditions: input.conditions ?? [],
        avatar_url: input.avatar_url ?? null,
      };

      const { data, error } = await ctx.supabase
        .from("pets")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to create pet: ${error.message}`,
        });
      }

      return data;
    }),

  /**
   * Lists all pets belonging to the authenticated user.
   * Ordered by most recently created first.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("pets")
      .select("*")
      .eq("user_id", ctx.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to list pets: ${error.message}`,
      });
    }

    return data;
  }),

  /**
   * Gets a single pet by ID. Validates ownership via RLS.
   */
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("pets")
        .select("*")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (error || !data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pet not found",
        });
      }

      return data;
    }),

  /**
   * Updates a pet's details. Only fields provided in input are changed.
   */
  update: protectedProcedure
    .input(updatePetSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input;

      // Verify ownership first
      const { data: existing } = await ctx.supabase
        .from("pets")
        .select("id")
        .eq("id", id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pet not found",
        });
      }

      const updateData: PetsUpdate = {};
      if (fields.name !== undefined) updateData.name = fields.name;
      if (fields.breed !== undefined) updateData.breed = fields.breed;
      if (fields.age !== undefined) updateData.age = fields.age;
      if (fields.weight !== undefined) updateData.weight = fields.weight;
      if (fields.sex !== undefined) updateData.sex = fields.sex;
      if (fields.color !== undefined) updateData.color = fields.color;
      if (fields.conditions !== undefined) updateData.conditions = fields.conditions;
      if (fields.avatar_url !== undefined) updateData.avatar_url = fields.avatar_url;

      const { data, error } = await ctx.supabase
        .from("pets")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to update pet: ${error.message}`,
        });
      }

      return data;
    }),

  /**
   * Deletes a pet by ID. Validates ownership before deletion.
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const { data: existing } = await ctx.supabase
        .from("pets")
        .select("id")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pet not found",
        });
      }

      const { error } = await ctx.supabase
        .from("pets")
        .delete()
        .eq("id", input.id);

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete pet: ${error.message}`,
        });
      }

      return { success: true };
    }),
});

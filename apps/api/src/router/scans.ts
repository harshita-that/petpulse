import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";
import {
  createScanSchema,
  scansListQuerySchema,
  scanFindingsQuerySchema,
} from "@petpulse/types";
import type { Database } from "@petpulse/db";

type ScansInsert = Database["public"]["Tables"]["scans"]["Insert"];

export const scansRouter = router({
  /**
   * Creates a new scan record with status 'pending'.
   * The scan is associated with a pet and includes the S3 image URL.
   */
  create: protectedProcedure
    .input(createScanSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify the pet belongs to this user
      const { data: pet } = await ctx.supabase
        .from("pets")
        .select("id")
        .eq("id", input.pet_id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!pet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pet not found",
        });
      }

      const insertData: ScansInsert = {
        pet_id: input.pet_id,
        user_id: ctx.user.id,
        scan_type: input.scan_type,
        image_url: input.image_url,
        status: "pending",
      };

      const { data, error } = await ctx.supabase
        .from("scans")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to create scan: ${error.message}`,
        });
      }

      return data;
    }),

  /**
   * Lists scans for the authenticated user.
   * Optionally filtered by pet_id.
   */
  list: protectedProcedure
    .input(scansListQuerySchema)
    .query(async ({ ctx, input }) => {
      let query = ctx.supabase
        .from("scans")
        .select("*")
        .eq("user_id", ctx.user.id)
        .order("created_at", { ascending: false });

      if (input.pet_id) {
        query = query.eq("pet_id", input.pet_id);
      }

      const { data, error } = await query;

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to list scans: ${error.message}`,
        });
      }

      return data;
    }),

  /**
   * Gets a single scan by ID, including its findings.
   */
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: scan, error: scanError } = await ctx.supabase
        .from("scans")
        .select("*")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (scanError || !scan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Scan not found",
        });
      }

      // Fetch associated findings
      const { data: findings } = await ctx.supabase
        .from("scan_findings")
        .select("*")
        .eq("scan_id", scan.id)
        .order("created_at", { ascending: true });

      return {
        ...scan,
        findings: findings ?? [],
      };
    }),

  /**
   * Gets all findings for a specific scan.
   */
  getFindings: protectedProcedure
    .input(scanFindingsQuerySchema)
    .query(async ({ ctx, input }) => {
      // Verify scan ownership
      const { data: scan } = await ctx.supabase
        .from("scans")
        .select("id")
        .eq("id", input.scan_id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!scan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Scan not found",
        });
      }

      const { data, error } = await ctx.supabase
        .from("scan_findings")
        .select("*")
        .eq("scan_id", input.scan_id)
        .order("created_at", { ascending: true });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to fetch findings: ${error.message}`,
        });
      }

      return data;
    }),
});

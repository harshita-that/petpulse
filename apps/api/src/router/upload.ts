import { randomUUID } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";
import { presignedUrlRequestSchema } from "@petpulse/types";
import { isAcceptedImageType, sanitizeFilename } from "@petpulse/utils";
import { getSignedUploadUrl, getPublicUrl } from "../lib/s3";

export const uploadRouter = router({
  /**
   * Generates a signed Supabase Storage upload URL for direct client upload.
   * Validates content type before generating the URL.
   */
  getPresignedUrl: protectedProcedure
    .input(presignedUrlRequestSchema)
    .mutation(async ({ ctx, input }) => {
      // Validate content type
      if (!isAcceptedImageType(input.content_type)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Unsupported file type: ${input.content_type}. Accepted: JPEG, PNG, HEIC`,
        });
      }

      // Generate a unique storage key
      const sanitized = sanitizeFilename(input.filename);
      const uniqueId = randomUUID();
      const key = `${ctx.user.id}/${uniqueId}/${sanitized}`;

      const { url, token, expires_at } = await getSignedUploadUrl(
        key,
        input.content_type,
      );

      return { url, key, token, expires_at };
    }),
});

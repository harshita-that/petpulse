import { z } from "zod";

export const presignedUrlRequestSchema = z.object({
  filename: z.string(),
  content_type: z.enum(["image/jpeg", "image/png", "image/heic"]),
});

export type PresignedUrlRequestInput = z.infer<typeof presignedUrlRequestSchema>;

export type PresignedUrlResponse = {
  url: string;
  key: string;
  expires_at: string;
};

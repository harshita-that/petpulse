import { z } from "zod";

export type ScanType = "teeth" | "eyes" | "skin" | "body";
export type ScanStatus = "pending" | "processing" | "complete" | "failed";
export type Severity = "normal" | "watch" | "concern" | "urgent";

export type Scan = {
  id: string;
  pet_id: string;
  user_id: string;
  scan_type: ScanType;
  image_url: string | null;
  status: ScanStatus;
  health_score: number | null;
  created_at: string;
};

export type ScanFinding = {
  id: string;
  scan_id: string;
  region_label: string;
  confidence: number;
  severity: Severity;
  description: string | null;
  created_at: string;
};

export const createScanSchema = z.object({
  pet_id: z.string().uuid(),
  scan_type: z.enum(["teeth", "eyes", "skin", "body"]),
  image_url: z.string(),
});

export type CreateScanInput = z.infer<typeof createScanSchema>;

export const scanFindingsQuerySchema = z.object({
  scan_id: z.string().uuid(),
});

export type ScanFindingsQueryInput = z.infer<typeof scanFindingsQuerySchema>;

export const scansListQuerySchema = z.object({
  pet_id: z.string().uuid().optional(),
});

export type ScansListQueryInput = z.infer<typeof scansListQuerySchema>;

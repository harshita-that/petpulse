import { createAdminClient } from "@petpulse/db";
import {
  PRESIGNED_URL_EXPIRY_SECONDS,
  MAX_IMAGE_SIZE_BYTES,
} from "@petpulse/utils";

const BUCKET = "scans";

/**
 * Generates a signed upload URL for Supabase Storage.
 * The client uploads directly to Supabase using this URL.
 */
export async function getSignedUploadUrl(
  key: string,
  _contentType: string,
): Promise<{ url: string; token: string; expires_at: string }> {
  const supabase = createAdminClient();

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(key);

  if (error || !data) {
    throw new Error(`Failed to create signed upload URL: ${error?.message ?? "unknown error"}`);
  }

  const expiresAt = new Date(
    Date.now() + PRESIGNED_URL_EXPIRY_SECONDS * 1000,
  ).toISOString();

  return {
    url: data.signedUrl,
    token: data.token,
    expires_at: expiresAt,
  };
}

/**
 * Gets a public or signed URL for reading an uploaded file.
 */
export function getPublicUrl(key: string): string {
  const supabase = createAdminClient();
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  return data.publicUrl;
}

/**
 * Deletes a file from Supabase Storage.
 */
export async function deleteStorageObject(key: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.storage.from(BUCKET).remove([key]);

  if (error) {
    throw new Error(`Failed to delete storage object: ${error.message}`);
  }
}

/**
 * Downloads a file from storage as a buffer (for server-side validation).
 */
export async function downloadStorageObject(key: string): Promise<Buffer> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage.from(BUCKET).download(key);

  if (error || !data) {
    throw new Error(`Failed to download storage object: ${error?.message ?? "unknown error"}`);
  }

  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export { BUCKET, MAX_IMAGE_SIZE_BYTES };

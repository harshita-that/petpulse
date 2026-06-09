import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from "./constants";

/**
 * Checks whether the given content type is an accepted image type.
 */
export function isAcceptedImageType(contentType: string): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(contentType);
}

/**
 * Checks whether the file size is within the allowed limit.
 */
export function isWithinSizeLimit(sizeBytes: number): boolean {
  return sizeBytes <= MAX_IMAGE_SIZE_BYTES;
}

/**
 * Generates an S3 object key for a scan image upload.
 */
export function generateS3Key(
  userId: string,
  petId: string,
  scanId: string,
  filename: string,
): string {
  return `uploads/${userId}/${petId}/${scanId}/${filename}`;
}

/**
 * Extracts the file extension from a filename (without the leading dot).
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1 || lastDot === filename.length - 1) {
    return "";
  }
  return filename.slice(lastDot + 1).toLowerCase();
}

/**
 * Sanitizes a filename by removing special characters while preserving the extension.
 */
export function sanitizeFilename(filename: string): string {
  const ext = getFileExtension(filename);
  const nameWithoutExt = ext
    ? filename.slice(0, filename.lastIndexOf("."))
    : filename;

  // Replace any non-alphanumeric characters (except hyphens and underscores) with underscores
  const sanitized = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, "_");

  return ext ? `${sanitized}.${ext}` : sanitized;
}

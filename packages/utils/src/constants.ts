export const SCAN_TYPES = ["teeth", "eyes", "skin", "body"] as const;
export const SCAN_STATUSES = ["pending", "processing", "complete", "failed"] as const;
export const SEVERITIES = ["normal", "watch", "concern", "urgent"] as const;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/heic"] as const;

/** Maximum image file size: 10 MB */
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

/** Minimum image width in pixels */
export const MIN_IMAGE_WIDTH = 800;

/** Minimum image height in pixels */
export const MIN_IMAGE_HEIGHT = 600;

/** Presigned URL expiry: 5 minutes */
export const PRESIGNED_URL_EXPIRY_SECONDS = 300;

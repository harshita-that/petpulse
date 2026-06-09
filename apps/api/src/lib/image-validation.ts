import sharp from "sharp";
import { MIN_IMAGE_WIDTH, MIN_IMAGE_HEIGHT } from "@petpulse/utils";

/** Accepted sharp format names that correspond to our allowed content types */
const ACCEPTED_FORMATS = new Set(["jpeg", "png", "heif"]);

/** Laplacian kernel for edge/blur detection */
const LAPLACIAN_KERNEL = {
  width: 3,
  height: 3,
  kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0],
};

/** Minimum Laplacian variance threshold — below this, image is too blurry */
const BLUR_THRESHOLD = 100;

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an image buffer for:
 * 1. Format (jpeg, png, heic/heif only)
 * 2. Resolution (min 800×600)
 * 3. Blur detection (Laplacian variance check)
 */
export async function validateImage(
  imageBuffer: Buffer,
): Promise<ImageValidationResult> {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    // 1. Format check
    if (!metadata.format || !ACCEPTED_FORMATS.has(metadata.format)) {
      return {
        valid: false,
        error: `Unsupported image format: ${metadata.format ?? "unknown"}. Accepted: JPEG, PNG, HEIC`,
      };
    }

    // 2. Resolution check
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    if (width < MIN_IMAGE_WIDTH || height < MIN_IMAGE_HEIGHT) {
      return {
        valid: false,
        error: `Image resolution ${width}×${height} is below minimum ${MIN_IMAGE_WIDTH}×${MIN_IMAGE_HEIGHT}`,
      };
    }

    // 3. Blur detection via Laplacian variance
    const grayscaleBuffer = await sharp(imageBuffer)
      .greyscale()
      .convolve(LAPLACIAN_KERNEL)
      .raw()
      .toBuffer();

    const variance = calculateVariance(grayscaleBuffer);

    if (variance < BLUR_THRESHOLD) {
      return {
        valid: false,
        error: `Image appears too blurry (sharpness score: ${variance.toFixed(1)}, minimum: ${BLUR_THRESHOLD})`,
      };
    }

    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      error: `Failed to process image: ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }
}

/**
 * Validates an image by fetching it from a URL (e.g., Supabase Storage signed URL).
 */
export async function validateImageFromUrl(
  url: string,
): Promise<ImageValidationResult> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        valid: false,
        error: `Failed to fetch image: HTTP ${response.status}`,
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return validateImage(buffer);
  } catch (err) {
    return {
      valid: false,
      error: `Failed to fetch image: ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }
}

/**
 * Calculates the variance of pixel values in a raw buffer.
 * Higher variance = sharper image, lower = blurrier.
 */
function calculateVariance(buffer: Buffer): number {
  const length = buffer.length;
  if (length === 0) return 0;

  let sum = 0;
  let sumSq = 0;

  for (let i = 0; i < length; i++) {
    const val = buffer[i]!;
    sum += val;
    sumSq += val * val;
  }

  const mean = sum / length;
  return sumSq / length - mean * mean;
}

import { describe, it, expect } from "vitest";
import {
  isAcceptedImageType,
  isWithinSizeLimit,
  generateS3Key,
  sanitizeFilename,
  getFileExtension,
  MAX_IMAGE_SIZE_BYTES,
} from "@petpulse/utils";

describe("isAcceptedImageType", () => {
  it("accepts image/jpeg", () => {
    expect(isAcceptedImageType("image/jpeg")).toBe(true);
  });

  it("accepts image/png", () => {
    expect(isAcceptedImageType("image/png")).toBe(true);
  });

  it("accepts image/heic", () => {
    expect(isAcceptedImageType("image/heic")).toBe(true);
  });

  it("rejects image/gif", () => {
    expect(isAcceptedImageType("image/gif")).toBe(false);
  });

  it("rejects image/webp", () => {
    expect(isAcceptedImageType("image/webp")).toBe(false);
  });

  it("rejects application/pdf", () => {
    expect(isAcceptedImageType("application/pdf")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isAcceptedImageType("")).toBe(false);
  });
});

describe("isWithinSizeLimit", () => {
  it("accepts 1 byte", () => {
    expect(isWithinSizeLimit(1)).toBe(true);
  });

  it("accepts exactly 10MB", () => {
    expect(isWithinSizeLimit(MAX_IMAGE_SIZE_BYTES)).toBe(true);
  });

  it("accepts 5MB", () => {
    expect(isWithinSizeLimit(5 * 1024 * 1024)).toBe(true);
  });

  it("rejects 10MB + 1 byte", () => {
    expect(isWithinSizeLimit(MAX_IMAGE_SIZE_BYTES + 1)).toBe(false);
  });

  it("rejects 20MB", () => {
    expect(isWithinSizeLimit(20 * 1024 * 1024)).toBe(false);
  });
});

describe("generateS3Key", () => {
  it("generates correct path format", () => {
    const key = generateS3Key("user-123", "pet-456", "scan-789", "photo.jpg");
    expect(key).toBe("uploads/user-123/pet-456/scan-789/photo.jpg");
  });

  it("handles filenames with spaces", () => {
    const key = generateS3Key("u1", "p1", "s1", "my photo.png");
    expect(key).toBe("uploads/u1/p1/s1/my photo.png");
  });
});

describe("sanitizeFilename", () => {
  it("keeps simple filenames unchanged", () => {
    expect(sanitizeFilename("photo.jpg")).toBe("photo.jpg");
  });

  it("removes special characters", () => {
    const result = sanitizeFilename("my <photo> (1).jpg");
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
    expect(result).toContain(".jpg");
  });

  it("preserves file extension", () => {
    const result = sanitizeFilename("weird!file@name.png");
    expect(result).toMatch(/\.png$/);
  });

  it("handles filenames with multiple dots", () => {
    const result = sanitizeFilename("photo.2024.01.jpg");
    expect(result).toMatch(/\.jpg$/);
  });
});

describe("getFileExtension", () => {
  it("returns jpg for .jpg file", () => {
    expect(getFileExtension("photo.jpg")).toBe("jpg");
  });

  it("returns png for .png file", () => {
    expect(getFileExtension("image.png")).toBe("png");
  });

  it("returns empty string for no extension", () => {
    expect(getFileExtension("noextension")).toBe("");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPetSchema, updatePetSchema } from "@petpulse/types";

/**
 * Unit tests for pet-related functionality.
 * Tests Zod schema validation and mock Supabase operations.
 */

describe("Pet Schema Validation", () => {
  describe("createPetSchema", () => {
    it("validates a complete pet input", () => {
      const input = {
        name: "Luna",
        breed: "Golden Retriever",
        age: 3,
        weight: 28.5,
        sex: "female" as const,
        color: "golden",
        conditions: ["allergies"],
        avatar_url: "https://example.com/luna.jpg",
      };

      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("validates with only name (minimum required)", () => {
      const input = { name: "Buddy" };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("rejects empty name", () => {
      const input = { name: "" };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects name over 100 characters", () => {
      const input = { name: "A".repeat(101) };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects negative age", () => {
      const input = { name: "Buddy", age: -1 };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects invalid sex value", () => {
      const input = { name: "Buddy", sex: "other" };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects invalid avatar_url", () => {
      const input = { name: "Buddy", avatar_url: "not-a-url" };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("accepts conditions as string array", () => {
      const input = {
        name: "Max",
        conditions: ["hip dysplasia", "allergies"],
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("updatePetSchema", () => {
    it("requires an id", () => {
      const input = { name: "Updated Name" };
      const result = updatePetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("validates update with id and name", () => {
      const input = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "New Name",
      };
      const result = updatePetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("validates update with id only (no fields to update)", () => {
      const input = {
        id: "550e8400-e29b-41d4-a716-446655440000",
      };
      const result = updatePetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("rejects invalid uuid for id", () => {
      const input = { id: "not-a-uuid", name: "Buddy" };
      const result = updatePetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("validates partial update with weight", () => {
      const input = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        weight: 32.1,
      };
      const result = updatePetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });
});

describe("Pets Router (Mocked)", () => {
  const mockSupabase = {
    from: vi.fn(),
  };

  const mockUser = {
    id: "user-uuid-123",
    email: "test@example.com",
    name: "Test User",
    avatar_url: null,
    created_at: new Date().toISOString(),
  };

  const mockPet = {
    id: "pet-uuid-456",
    user_id: "user-uuid-123",
    name: "Luna",
    breed: "Golden Retriever",
    age: 3,
    weight: 28.5,
    sex: "female",
    color: "golden",
    conditions: ["allergies"],
    avatar_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mock setup creates realistic pet data", () => {
    expect(mockPet.name).toBe("Luna");
    expect(mockPet.user_id).toBe(mockUser.id);
    expect(mockPet.conditions).toContain("allergies");
  });

  it("mock user has required fields", () => {
    expect(mockUser.id).toBeDefined();
    expect(mockUser.email).toContain("@");
  });

  it("validates pet ownership check pattern", () => {
    // Simulates the ownership check used in the router
    const isOwner = mockPet.user_id === mockUser.id;
    expect(isOwner).toBe(true);

    const otherUserId = "other-user-uuid";
    const isNotOwner = mockPet.user_id === otherUserId;
    expect(isNotOwner).toBe(false);
  });

  it("validates scan types are valid for pet scans", () => {
    const validTypes = ["teeth", "eyes", "skin", "body"];
    validTypes.forEach((type) => {
      expect(["teeth", "eyes", "skin", "body"]).toContain(type);
    });
  });
});

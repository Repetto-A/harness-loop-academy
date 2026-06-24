import { describe, it, expect } from "vitest";
import { getUserDisplayName } from "./users.js";

describe("getUserDisplayName", () => {
  it("returns uppercase name for existing user", () => {
    expect(getUserDisplayName("1")).toBe("ANA GARCÍA");
  });

  it("returns null for missing user (domain contract)", () => {
    expect(getUserDisplayName("999")).toBeNull();
  });
});

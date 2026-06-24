import { describe, it, expect } from "vitest";
import { getUserDisplayName } from "./users.js";

describe("getUserDisplayName", () => {
  it("returns uppercase name for existing user", () => {
    expect(getUserDisplayName("1")).toBe("ANA GARCÍA");
  });

  it("throws for missing user (legacy — ver TASK-12)", () => {
    expect(() => getUserDisplayName("999")).toThrow();
  });
});

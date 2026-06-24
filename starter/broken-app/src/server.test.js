import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server.js";

describe("GET /api/users/:id/display-name", () => {
  it("returns display name for valid user", async () => {
    const res = await request(app).get("/api/users/1/display-name");
    expect(res.status).toBe(200);
    expect(res.body.displayName).toBe("ANA GARCÍA");
  });

  it("returns 404 with contract body for missing user", async () => {
    const res = await request(app).get("/api/users/999/display-name");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "User not found" });
  });
});

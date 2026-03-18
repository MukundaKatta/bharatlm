import { describe, it, expect } from "vitest";
import { Bharatlm } from "../src/core.js";
describe("Bharatlm", () => {
  it("init", () => { expect(new Bharatlm().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Bharatlm(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Bharatlm(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});

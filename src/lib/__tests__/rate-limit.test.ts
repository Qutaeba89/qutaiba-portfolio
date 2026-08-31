import { describe, expect, it } from "vitest";
import { checkRateLimit } from "../rate-limit";

describe("checkRateLimit", () => {
  it("allows the first request for a fresh key", () => {
    const result = checkRateLimit("key-fresh", 1_000);
    expect(result.limited).toBe(false);
  });

  it("blocks a key once it exceeds the max requests in the window", () => {
    const key = "key-burst";
    checkRateLimit(key, 1_000);
    checkRateLimit(key, 1_100);
    checkRateLimit(key, 1_200);

    const fourth = checkRateLimit(key, 1_300);
    expect(fourth.limited).toBe(true);
  });

  it("allows a request again once the oldest hit has fallen outside the window", () => {
    const key = "key-window";
    const windowMs = 10 * 60 * 1000;
    checkRateLimit(key, 0);
    checkRateLimit(key, 100);
    checkRateLimit(key, 200);
    expect(checkRateLimit(key, 300).limited).toBe(true);

    const afterWindow = checkRateLimit(key, windowMs + 1);
    expect(afterWindow.limited).toBe(false);
  });

  it("tracks different keys independently", () => {
    const busyKey = "key-a";
    checkRateLimit(busyKey, 5_000);
    checkRateLimit(busyKey, 5_100);
    checkRateLimit(busyKey, 5_200);
    expect(checkRateLimit(busyKey, 5_300).limited).toBe(true);

    expect(checkRateLimit("key-b", 5_300).limited).toBe(false);
  });
});

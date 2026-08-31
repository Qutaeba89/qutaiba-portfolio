const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

/**
 * In-memory sliding-window limiter, scoped to one server instance.
 * Vercel's Fluid Compute reuses warm instances, so this catches repeat
 * abuse from the same instance; it is not a global/distributed limit.
 */
export function checkRateLimit(
  key: string,
  now: number = Date.now(),
): { limited: boolean } {
  const windowStart = now - WINDOW_MS;
  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return { limited: true };
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  if (hits.size > MAX_TRACKED_KEYS) {
    const oldestKey = hits.keys().next().value;
    if (oldestKey !== undefined) hits.delete(oldestKey);
  }

  return { limited: false };
}

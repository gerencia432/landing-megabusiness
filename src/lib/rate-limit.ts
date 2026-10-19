import "server-only";

/**
 * Límite de intentos en memoria por clave (IP). Suficiente para una sola
 * instancia del contenedor; si se escala a varias, mover a Redis.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Limpieza ocasional para que el mapa no crezca sin control
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return false;
}

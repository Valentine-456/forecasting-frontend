import type { ForecastPoint } from "../components/ForecastPlotCard/ForecastPlotCard";

export function mergeForecast(
  existing: ForecastPoint[],
  incoming: ForecastPoint[]
): ForecastPoint[] {
  if (existing.length === 0) return incoming;

  const lastExistingTick = existing[existing.length - 1].tick;
  const firstIncomingTick = incoming[0].tick;

  const overlap = lastExistingTick - firstIncomingTick + 1;

  if (overlap >= 0) {
    const sliceIndex = existing.length - overlap;
    return [...existing.slice(0, sliceIndex), ...incoming];
  }

  return [...existing, ...incoming];
}

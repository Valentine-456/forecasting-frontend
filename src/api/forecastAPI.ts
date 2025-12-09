import type { ForecastModel, UAVState, ForecastResponse } from "../dto/forecastDto";

const BASE_URL = "http://localhost:8000";

export async function fetchModels(): Promise<ForecastModel[]> {
  const res = await fetch(`${BASE_URL}/forecast/models`);
  if (!res.ok) throw new Error("Failed to load models");
  return res.json();
}

export async function runForecast(
  modelId: string,
  horizonSeconds: number,
  uav: UAVState
): Promise<ForecastResponse> {
  const res = await fetch(`${BASE_URL}/forecast/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model_id: modelId,
      horizon_seconds: horizonSeconds,
      uav_state: uav,
    }),
  });

  if (!res.ok) throw new Error("Forecast failed");
  return res.json();
}

export interface ForecastModel {
  id: string;
  name: string;
  version: string;
  description: string;
}

export interface UAVState {
  soc_percentage: number;
  wind_speed: number;
  payload: number;
  battery_capacity_mAh: number;
}

export interface ForecastPointResponse {
  timestamp: string;
  value: number;
}

export interface ForecastResponse {
  model_id: string;
  generated_at: string;
  points: ForecastPointResponse[];
}
import { useState } from "react";
import { runForecast } from "../api/forecastAPI";
import type { ForecastPoint } from "../components/ForecastPlotCard/ForecastPlotCard";
import { mergeForecast } from "../utils/mergeForecast";

export function useForecastStream() {
  const [data, setData] = useState<ForecastPoint[]>([]);
  const [timer, setTimer] = useState<number | null>(null);
  const [tickCounter, setTickCounter] = useState(0);

  const runOnce = async (params: {
    modelId: string;
    horizon: number;
    uav: any;
  }) => {
    const response = await runForecast(
      params.modelId,
      params.horizon,
      params.uav
    );

    const newData = response.points.map((p, i) => ({
        tick: tickCounter + i,
        time: new Date(p.timestamp).toLocaleTimeString(),
        historical: null,
        forecast: p.value,
    }));


    setTickCounter(prev => prev + newData.length); // increment global tick
    setData(prev => mergeForecast(prev, newData));
  };

  const startStreaming = (params: {
    modelId: string;
    horizon: number;
    uav: any;
  }) => {
    if (timer) return; // already streaming

    const id = window.setInterval(() => runOnce(params), 3000);
    setTimer(id);
  };

  const stopStreaming = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const clearData = () => {
    setData([]);
    setTickCounter(0);
  };

  const currentPoint = data.find(p => p.tick === tickCounter - 1) || null;


  return {
    data,
    currentPoint,
    runOnce,
    startStreaming,
    stopStreaming,
    clearData,
  };
}

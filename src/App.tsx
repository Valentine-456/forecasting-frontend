import "./App.css";
import React, { useState } from "react";
import { CssBaseline, Grid, Typography, Box } from "@mui/material";
import ModelControl from "./components/ModelControl/ModelControl";
import DroneControl from "./components/DroneControl/DroneControl";
import ForecastPlotCard, {
  type ForecastPoint,
} from "./components/ForecastPlotCard/ForecastPlotCard";
import RecentForecastsCard from "./components/RecentForecastsCard/RecentForecastsCard";
import EnvironmentControl from "./components/EnvironmentControl/EnvironmentControl";
import { runForecast } from "./api/forecastAPI";

const App: React.FC = () => {
  const [modelId, setModelId] = useState<string>("mlr_battery_current");
  const [horizon, setHorizon] = useState<string>("60");
  const [plotData, setPlotData] = useState<ForecastPoint[]>([]);
  const [droneValues, setDroneValues] = useState({
    soc_percentage: "73",
    payload: "1.2",
    battery_capacity_mAh: "4400",
  });

  const updateDrone = (field: string, value: string) => {
    setDroneValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleRunForecast = async () => {
      const response = await runForecast(modelId, Number(horizon), {
        soc_percentage: Number(droneValues.soc_percentage),
        wind_speed: 20, // temporary
        payload: Number(droneValues.payload),
        battery_capacity_mAh: Number(droneValues.battery_capacity_mAh),
      });

      const newData = response.points.map((p) => ({
        time: new Date(p.timestamp).toLocaleTimeString(),
        historical: null,
        forecast: p.value,
        ciUpper: p.value + 5,
      }));

    setPlotData(newData);
  }


  return (
    <>
      <CssBaseline />

      {/* Top bar */}
      <Box sx={{ py: 2, px: 3, borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          UAV Forecast Dashboard
        </Typography>
        <ModelControl 
          model={modelId}
          horizon={horizon}
          onModelChange={setModelId}
          onHorizonChange={setHorizon}
        />
      </Box>

      {/* Full width layout */}
      <Box sx={{ px: 3 }}>
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid size={{xs:12, md:3}}>
            <DroneControl
              {...droneValues}
              onChange={updateDrone}
            />
          </Grid>

          {/* Middle column */}
          <Grid size={{xs:12, md:6}}>
            <ForecastPlotCard data={plotData} onRunForecast={handleRunForecast} />
            <RecentForecastsCard data={plotData} />
          </Grid>

          {/* Right column */}
          <Grid size={{xs:12, md:3}} >
            <EnvironmentControl/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
 
export default App;

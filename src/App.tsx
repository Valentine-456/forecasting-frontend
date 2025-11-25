import "./App.css";
import React from "react";
import { CssBaseline, Grid, Typography, Box } from "@mui/material";
import ModelControl from "./components/ModelControl/ModelControl";
import DroneControl from "./components/DroneControl/DroneControl";
import ForecastPlotCard, {
  ForecastPoint,
} from "./components/ForecastPlotCard/ForecastPlotCard";
import RecentForecastsCard from "./components/RecentForecastsCard/RecentForecastsCard";
import EnvironmentControl from "./components/EnvironmentControl/EnvironmentControl";
import DiagnosticPlotsCard from "./components/DiagnosticPlotsCard/DiagnosticPlotsCard";

const forecastData: ForecastPoint[] = [
  { time: "00:05", historical: 73.0, forecast: null, ciUpper: null },
  { time: "00:10", historical: 72.7, forecast: null, ciUpper: null },
  { time: "00:15", historical: 72.4, forecast: 72.1, ciUpper: 80 },
  { time: "00:20", historical: null, forecast: 71.8, ciUpper: 82 },
  { time: "00:25", historical: null, forecast: 71.4, ciUpper: 84 },
  { time: "00:30", historical: null, forecast: 71.1, ciUpper: 86 },
];

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />

      {/* Top bar */}
      <Box sx={{ py: 2, px: 3, borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          UAV Forecast Dashboard
        </Typography>
        <ModelControl />
      </Box>

      {/* Full width layout */}
      <Box sx={{ px: 3 }}>
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={12} md={3}>
            <DroneControl />
          </Grid>

          {/* Middle column */}
          <Grid item xs={12} md={6}>
            <ForecastPlotCard data={forecastData} />
            <RecentForecastsCard data={forecastData} />
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={3}>
            <EnvironmentControl/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
 
export default App;

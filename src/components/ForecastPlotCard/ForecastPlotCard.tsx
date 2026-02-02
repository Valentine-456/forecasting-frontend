import React, { useRef, useState } from "react";
import {
  Box, Button, FormControl, InputLabel, MenuItem, Paper,
  Select, Typography, IconButton
} from "@mui/material";
import {
  ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis,
  CartesianGrid, Legend, Tooltip
} from "recharts";
import DownloadIcon from "@mui/icons-material/Download";
import StopIcon from "@mui/icons-material/Stop";
import ClearIcon from "@mui/icons-material/Clear";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import html2canvas from "html2canvas"

export type ForecastPoint = {
  tick: number;
  time: string;
  historical: number | null;
  forecast: number | null;
};

interface ForecastPlotCardProps {
  data: ForecastPoint[];
  current: ForecastPoint | null;   
  onRunForecast: () => void;
  onStopForecast: () => void;
  onClear: () => void;
}

const ForecastPlotCard: React.FC<ForecastPlotCardProps> = ({
  data,
  current,
  onRunForecast,
  onStopForecast,
  onClear
}) => {
  const [parameter, setParameter] = useState("batterySoc");
  const chartRef = useRef<HTMLDivElement>(null);

const handleDownload = async () => {
  if (!chartRef.current) return;

  const canvas = await html2canvas(chartRef.current, {
    backgroundColor: "#ffffff",
    scale: 2,
  });

  const link = document.createElement("a");
  link.download = "forecast_chart.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};


  return (
    <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, display: "flex", flexDirection: "column", height: 360 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Forecast Plot
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Battery SOC</InputLabel>
            <Select
              value={parameter}
              label="Battery SOC"
              onChange={(e) => setParameter(e.target.value as string)}
            >
              <MenuItem value="batterySoc">Battery SOC</MenuItem>
              <MenuItem value="windSpeed">Wind speed</MenuItem>
              <MenuItem value="temperature">Temperature</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={onRunForecast}>
            Run forecast
          </Button>

          <IconButton onClick={onStopForecast} title="Stop">
            <StopIcon />
          </IconButton>

          <IconButton onClick={onClear} title="Clear">
            <ClearIcon />
          </IconButton>

          <IconButton onClick={handleDownload} title="Export PNG">
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flex: 1, minHeight: 240 }} ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Legend />
            <Tooltip
              formatter={(value: ValueType) =>
                typeof value === "number" ? value.toFixed(2) : value
              }
            />

            <Area type="monotone" dataKey="ciUpper" fill="url(#ciFill)" name="Confidence interval" />
            <Line type="monotone" dataKey="forecast" stroke="#1976d2" strokeDasharray="5 5" dot={false} />

            {current && (
              <Line
                type="monotone"
                data={[current]}
                dataKey="forecast"
                stroke="red"
                dot={{ r: 6, fill: "red" }}
                legendType="none"
                isAnimationActive={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ForecastPlotCard;

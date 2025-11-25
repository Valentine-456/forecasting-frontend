import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import DownloadIcon from "@mui/icons-material/Download";

export type ForecastPoint = {
  time: string;
  historical: number | null;
  forecast: number | null;
  ciUpper: number | null;
};

interface ForecastPlotCardProps {
  data: ForecastPoint[];
}

const ForecastPlotCard: React.FC<ForecastPlotCardProps> = ({ data }) => {
  const [parameter, setParameter] = useState("batterySoc");

  const handleParameterChange = (e: SelectChangeEvent) => {
    setParameter(e.target.value as string);
  };

  const handleRunForecast = () => {
    // TODO: call your backend and update data
    console.log("Run forecast clicked");
  };

  const handleDownload = () => {
    // TODO: implement export (CSV / PNG / whatever)
    console.log("Download clicked");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        height: 340,
      }}
    >
      {/* Header row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          gap: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Forecast Plot
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Battery SOC</InputLabel>
            <Select
              value={parameter}
              label="Battery SOC"
              onChange={handleParameterChange}
            >
              <MenuItem value="batterySoc">Battery SOC</MenuItem>
              <MenuItem value="windSpeed">Wind speed</MenuItem>
              <MenuItem value="temperature">Temperature</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleRunForecast}>
            Run forecast
          </Button>

          <IconButton onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Chart area */}
      <Box sx={{ flex: 1, minHeight: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="ciFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1976d2" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#1976d2" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              formatter={(value: number | null) =>
                value == null ? "" : `${value}%`
              }
            />
            <Legend />

            {/* Confidence interval (from forecast up to ciUpper) */}
            <Area
              type="monotone"
              dataKey="ciUpper"
              stroke={false}
              fill="url(#ciFill)"
              name="Confidence interval"
              isAnimationActive={false}
            />

            {/* Historical */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#1976d2"
              dot={false}
              name="Historical"
              isAnimationActive={false}
            />

            {/* Forecast */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#1976d2"
              strokeDasharray="5 5"
              dot={false}
              name="Forecast"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ForecastPlotCard;

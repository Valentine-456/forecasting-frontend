import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ForecastPoint } from "../ForecastPlotCard/ForecastPlotCard";

interface RecentForecastsCardProps {
  data: ForecastPoint[];
}

const RecentForecastsCard: React.FC<RecentForecastsCardProps> = ({ data }) => {
  // flatten to time + value (forecast > historical)
  const rows = data
    .map((p) => ({
      time: p.time,
      value: p.forecast ?? p.historical,
    }))
    .filter((r) => r.value != null) as { time: string; value: number }[];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 1.5,
        marginTop: 2
      }}
    >
      <Typography variant="subtitle1" fontWeight={700}>
        Recent values
      </Typography>

      {/* Scrollable list */}
      <Box
        sx={{
          maxHeight: 100,
          overflowY: "auto",
          pr: 1, // space for scrollbar
        }}
      >
        {rows.map((row) => (
          <Box
            key={`${row.time}-${row.value}`}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              py: 0.5,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-of-type": { borderBottom: "none" },
            }}
          >
            <span>{row.time}</span>
            <span>{row.value.toFixed(1)}%</span>
          </Box>
        ))}
        {rows.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No data to display.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default RecentForecastsCard;

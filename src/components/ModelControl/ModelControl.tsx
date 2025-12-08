import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, type SelectChangeEvent } from "@mui/material";

interface ModelControlProps {
  model?: string;
  horizon?: string;
  onModelChange?: (value: string) => void;
  onHorizonChange?: (value: string) => void;
}

export const ModelControl: React.FC<ModelControlProps> = (props: ModelControlProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 3,
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          fontSize: 14,
          fontWeight: 600,
          pl: 1,
          width: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        Model parameters:
      </Box>

        <Box sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-around",
        }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Model</InputLabel>
        <Select
          value={props.model}
          label="Chosen model"
          onChange={(e: SelectChangeEvent) => props.onModelChange?.(e.target.value)}
        >
          <MenuItem value="MLR">MLR</MenuItem>
          <MenuItem value="ARIMAX">ARIMAX</MenuItem>
          <MenuItem value="VAR">VAR</MenuItem>
          <MenuItem value="LSTM">LSTM</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Forecast horizon</InputLabel>
        <Select
          value={props.horizon}
          label="Forecast horizon"
          onChange={(e: SelectChangeEvent) => props.onHorizonChange?.(e.target.value)}
        >
          <MenuItem value="1min">1 min</MenuItem>
          <MenuItem value="2min">2 min</MenuItem>
          <MenuItem value="5min">5 min</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Paper>
  );
};

export default ModelControl;

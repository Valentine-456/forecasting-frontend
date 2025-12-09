import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, type SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchModels } from "../../api/forecastAPI";
import type { ForecastModel } from "../../dto/forecastDto";

interface ModelControlProps {
  model?: string;
  horizon?: string;
  onModelChange?: (value: string) => void;
  onHorizonChange?: (value: string) => void;
}

export const ModelControl: React.FC<ModelControlProps> = ({
  model,
  horizon,
  onModelChange,
  onHorizonChange,
}) => {

  const { data: models, isLoading } = useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
  });

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
          value={model ?? ""}
          label="Model"
          onChange={(e) => onModelChange?.(e.target.value)}
          
        >
          {isLoading && <MenuItem>Loading…</MenuItem>}

          {models?.map((m: ForecastModel) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name} {m.version}
            </MenuItem>
          ))}
        </Select>

      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Forecast horizon</InputLabel>
        <Select
          value={horizon}
          label="Forecast horizon"
          onChange={(e: SelectChangeEvent) => onHorizonChange?.(e.target.value)}
        >
          <MenuItem value="60">1 min</MenuItem>
          <MenuItem value="120">2 min</MenuItem>
          <MenuItem value="300">5 min</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </Paper>
  );
};

export default ModelControl;

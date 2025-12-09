import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";

interface DroneControlProps {
  soc_percentage: string;
  payload: string;
  battery_capacity_mAh: string;
  onChange: (field: string, value: string) => void;
}
const DroneControl: React.FC<DroneControlProps> = ({
  soc_percentage,
  payload,
  battery_capacity_mAh,
  onChange,
}) => {
  const batteryError = soc_percentage.trim() === "";

  return (
    <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3 }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        UAV Configuration
      </Typography>

      <Stack spacing={2}>
        {/* Battery SOC */}
        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }} fontWeight={500}>
            Current battery SoC (%)
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={soc_percentage}
            onChange={(e) => onChange("soc_percentage", e.target.value)}
            error={batteryError}
          />
        </Box>

        {/* Payload */}
        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }} fontWeight={500}>
            Payload weight
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={payload}
            onChange={(e) => onChange("payload", e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </Box>

        {/* Battery capacity */}
        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }} fontWeight={500}>
            Battery capacity
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={battery_capacity_mAh}
            onChange={(e) => onChange("battery_capacity_mAh", e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">mAh</InputAdornment>,
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );

};

export default DroneControl;

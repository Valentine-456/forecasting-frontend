import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";

const EnvironmentControl: React.FC = () => {
  const [windSpeed, setWindSpeed] = useState("5");
  const [windDirection, setWindDirection] = useState("270");
  const [temperature, setTemperature] = useState("16");

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Environment Configuration
      </Typography>

      <Stack spacing={2}>
        {/* Wind speed */}
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            Wind speed
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={windSpeed}
            onChange={(e) => setWindSpeed(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">m/s</InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Wind direction */}
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            Wind direction
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={windDirection}
            onChange={(e) => setWindDirection(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">°</InputAdornment>,
            }}
          />
        </Box>

        {/* External temperature */}
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            External temperature
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default EnvironmentControl;

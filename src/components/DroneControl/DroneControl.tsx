import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";

const DroneControl: React.FC = () => {
  const [batterySoc, setBatterySoc] = useState("");
  const [uavMass, setUavMass] = useState("3.5");
  const [maxElevation, setMaxElevation] = useState("120");
  const [payloadWeight, setPayloadWeight] = useState("1.2");

  const batteryError = batterySoc.trim() === "";

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        UAV Configuration
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            Current battery SoC
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={batterySoc}
            onChange={(e) => setBatterySoc(e.target.value)}
            placeholder="Required"
            error={batteryError}
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            UAV mass
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={uavMass}
            onChange={(e) => setUavMass(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">kg</InputAdornment>
              ),
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            Maximum elevation
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={maxElevation}
            onChange={(e) => setMaxElevation(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5 }}
            color="text.primary"
            fontWeight={500}
          >
            Payload weight
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={payloadWeight}
            onChange={(e) => setPayloadWeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">kg</InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default DroneControl;

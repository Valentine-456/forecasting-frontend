import './App.css'
import React from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import ModelControl from './components/ModelControl/ModelControl';

const PlaceholderCard: React.FC<{ title: string; height?: number }> = ({
  title,
  height = 200,
}) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      mb: 2,
      height,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 3,
    }}
  >
    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Placeholder content
    </Typography>
  </Paper>
);

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />

      {/* Top bar */}
      <Box sx={{ py: 2, px: 3, borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          UAV Forecast Dashboard
        </Typography>
        <ModelControl/>
      </Box>

      {/* Full width layout */}
      <Box sx={{ px: 3 }}>
        <Grid container spacing={2}>
          
          {/* Left column */}
          <Grid size={{ xs: 12, md: 3 }}>
            <PlaceholderCard title="UAV Configuration" height={400} />
          </Grid>

          {/* Middle column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <PlaceholderCard title="Forecast Plot" height={280} />
            <PlaceholderCard title="Target forecasts table" height={180} />
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 3 }}>
            <PlaceholderCard title="Diagnostic plots" height={220} />
            <PlaceholderCard title="Recent forecasts" height={200} />
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default App;

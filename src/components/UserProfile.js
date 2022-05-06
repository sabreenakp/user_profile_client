import React from 'react';
import {
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

const theme = createTheme();

export function UserProfile(){
    return (
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
               Profile
              </Typography>
            </Box>
          </Container>
        </ThemeProvider>
      );
}
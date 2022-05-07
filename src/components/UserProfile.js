import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { fetchuser } from "../services/user.service";

const theme = createTheme();

export function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userProfileContent, setUserProfileContent] = useState("");
  const logout = () => {
    localStorage.clear()
    navigate("/signin");
  };
  const getUserProfile = () => {
    fetchuser(id)
      .then((response) => {
        if (response.data.status) {
          setUserProfileContent(response.data.data);
        } else {
          toast(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          type: "error",
        });
      });
  };

  useEffect(() => {
    getUserProfile();
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            My Profile
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex", gap: 10, marginRight: 20 },
            }}
          >
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                <Grid item xs={8}>
                  <Avatar
                    alt=""
                    src={userProfileContent.file_path}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
              </Typography>
            </Box>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {userProfileContent.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {userProfileContent.summary}
            </Typography>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Contact Info
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {userProfileContent.country_code}
          {userProfileContent.phone_number}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {userProfileContent.email}
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

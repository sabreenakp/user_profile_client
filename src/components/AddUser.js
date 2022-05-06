import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { adduser } from "../services/auth.service";

const theme = createTheme();

export function AddUser() {
  const navigate = useNavigate();
  const [country_code, setCountryCode] = React.useState("");
  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };
  const [file, setFile] = React.useState(null);
  const handleFileSelect = (event) => {
    setFile(event.target.files);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("file_name", file[0].name);
    const data = new FormData(event.currentTarget);
    formData.append("name", data.get("name"));
    formData.append("country_code", data.get("countryCode"));
    formData.append("phone_number", data.get("phoneNumber"));
    formData.append("email", data.get("email"));
    adduser(formData)
      .then((response) => {
        if (response.data.status) {
          navigate("/profile");
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
            Create a New Account
          </Typography>
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              height: "70px",
              width: "70px",
            }}
          >
            <Button variant="raised" component="label">
              <CameraAltIcon />
              <input
                type="file"
                name="profile_image"
                id="profileImage"
                onChange={handleFileSelect}
                hidden
                required
                accept="image/png, image/jpeg"
              />
            </Button>
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    id="countryCode"
                    label="Country"
                    name="countryCode"
                    value={country_code}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value={"+1"}>+1</MenuItem>
                    <MenuItem value={"+91"}>+91</MenuItem>
                    <MenuItem value={"+49"}>+49</MenuItem>
                    <MenuItem value={"+44"}>+44</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/profile" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

import { useState } from "react";
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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "react-toastify/dist/ReactToastify.css";

import { adduser } from "../services/auth.service";

const theme = createTheme();

export function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const [country_code, setCountryCode] = useState("");
  const handleChangeCode = (event) => {
    setCountryCode(event.target.value);
  };
  const [phone_number, setPhoneNumber] = useState("");
  const handleChangePhone = (event) => {
    setPhoneNumber(event.target.value);
  };
  const [email, setEmail] = useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const [summary, setSummary] = useState("");
  const handleChangeSummary = (event) => {
    setSummary(event.target.value);
  };
  const [password, setPassword] = useState("");
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const [file, setFile] = useState(null);
  const handleFileSelect = (event) => {
    setFile(event.target.files);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("name", name);
    formData.append("country_code", country_code);
    formData.append("phone_number",phone_number);
    formData.append("email", email);
    formData.append("summary", summary);
    formData.append("password", password);
    adduser(formData)
      .then((response) => {
        if (response.data.status) {
          navigate(`/verify/${response.data.data.email}`);
        } else {
          toast(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            type: "error",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a New Account
          </Typography>
          {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : null}
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
                  value={name}
                  onChange={handleChangeName}
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
                    onChange={handleChangeCode}
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
                  value={phone_number}
                  onChange={handleChangePhone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  placeholder="Profile Summary..."
                  style={{ width: 400, height: 150, overflow: "scroll" }}
                  id="summary"
                  label="Summary"
                  name="summary"
                  value={summary}
                  onChange={handleChangeSummary}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" color="primary">
                  {" "}
                  <CameraAltIcon /> Upload Photo
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!file || !name || !email || !country_code || !phone_number || !password}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2">
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

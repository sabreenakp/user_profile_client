import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { confirmUserSignUp } from "../services/auth.service";

const theme = createTheme();

export function ConfirmSignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  const [code, setCode] = useState("");
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let userData = {
      email: email,
      code: code,
    };
    confirmUserSignUp(userData)
      .then((response) => {
        if (response.data.status) {
          navigate("/signin");
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
      <Container component="main" maxWidth="md">
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
            Verify Account
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : null}
          <Grid
            container
            justifyContent="center"
            sx={{ marginTop: 3, color: "red" }}
          >
            <Grid item>
              <Typography variant="caption" display="block" gutterBottom>
                Verfication code has been send to {email}
              </Typography>
            </Grid>
          </Grid>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="code"
                  label="Verfication Code"
                  type="code"
                  id="code"
                  value={code}
                  onChange={handleChangeCode}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!code}
            >
              Send Code
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function PageNotFound() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography justifyContent="center" variant="h6" gutterBottom component="div">
                   Page Not Found
                </Typography>
            </Container>
        </ThemeProvider>
    );
}
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
    title: string;
    message: string;
    statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ title, message, statusCode }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    color="primary"
                    sx={{ mb: 2, fontSize: '4rem' }}
                >
                    {statusCode}
                </Typography>

                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ mb: 2, textAlign: 'center' }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, textAlign: 'center' }}
                >
                    {message}
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                >
                    На головну
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage; 
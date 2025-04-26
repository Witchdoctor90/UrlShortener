import React, { useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import InputField from '../components/forms/InputField';
import Button from '../components/forms/Button';
import Form from '../components/forms/Form';

const HomePage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Тут буде логіка створення скороченого посилання
            console.log('Creating short URL for:', url);
            // Приклад відповіді
            setShortUrl('http://localhost:5000/abc123');
        } catch (err) {
            setError('Помилка при створенні скороченого посилання');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ mb: 4, textAlign: 'center' }}
                >
                    Скорочувач посилань
                </Typography>

                <Form onSubmit={handleSubmit}>
                    <InputField
                        label="Введіть URL для скорочення"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        error={error}
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        sx={{ mt: 2 }}
                    >
                        Скоротити
                    </Button>

                    {shortUrl && (
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                mt: 3,
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <Typography variant="body1" gutterBottom>
                                Ваше скорочене посилання:
                            </Typography>
                            <Typography
                                variant="body1"
                                component="a"
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {shortUrl}
                            </Typography>
                        </Paper>
                    )}
                </Form>
            </Box>
        </Container>
    );
};

export default HomePage; 
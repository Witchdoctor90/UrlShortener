import React, { useState } from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/forms/InputField';
import Button from '../components/forms/Button';
import Form from '../components/forms/Form';
import { authService } from '../api/auth.service';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Базова валідація
        if (!username.trim()) {
            setErrors(prev => ({ ...prev, username: 'Введіть ім\'я користувача' }));
            setIsLoading(false);
            return;
        }

        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Введіть пароль' }));
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Паролі не співпадають' }));
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.register({ Username: username, Password: password });
            
            if (response.success) {
                navigate('/');
            } else {
                setErrors({
                    submit: response.error || 'Помилка при реєстрації. Спробуйте ще раз.'
                });
            }
        } catch (error) {
            setErrors({
                submit: 'Помилка при реєстрації. Спробуйте ще раз.'
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ mb: 4, textAlign: 'center' }}
                >
                    Реєстрація
                </Typography>

                <Form onSubmit={handleSubmit}>
                    <InputField
                        label="Ім'я користувача"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={errors.username}
                        required
                    />

                    <InputField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        required
                    />

                    <InputField
                        label="Підтвердіть пароль"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        required
                    />

                    {errors.submit && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {errors.submit}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        sx={{ mt: 2 }}
                    >
                        Зареєструватися
                    </Button>

                    <Typography sx={{ mt: 2, textAlign: 'center' }}>
                        Вже маєте акаунт?{' '}
                        <MuiLink component={Link} to="/login">
                            Увійти
                        </MuiLink>
                    </Typography>
                </Form>
            </Box>
        </Container>
    );
};

export default RegisterPage; 
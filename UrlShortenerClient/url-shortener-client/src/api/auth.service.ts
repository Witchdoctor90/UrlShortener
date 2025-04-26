import api from './api';
import { API_ENDPOINTS } from './api.docs';

interface AuthResponse {
    success: boolean;
    data?: {
        token: string;
    };
    error?: string;
}

interface LoginCredentials {
    Username: string;
    Password: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const formData = new FormData();
            formData.append('Username', credentials.Username);
            formData.append('Password', credentials.Password);

            const response = await api.post<string>(
                API_ENDPOINTS.AUTH.LOGIN,
                formData
            );

            if (response.data) {
                localStorage.setItem('token', response.data);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                return { success: true, data: { token: response.data } };
            }

            return {
                success: false,
                error: 'Помилка при вході. Спробуйте ще раз.'
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'Помилка при вході. Спробуйте ще раз.'
            };
        }
    },

    async register(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const formData = new FormData();
            formData.append('Username', credentials.Username);
            formData.append('Password', credentials.Password);

            const response = await api.post<string>(
                API_ENDPOINTS.AUTH.REGISTER,
                formData
            );

            if (response.data) {
                localStorage.setItem('token', response.data);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                return { success: true, data: { token: response.data } };
            }

            return {
                success: false,
                error: 'Помилка при реєстрації. Спробуйте ще раз.'
            };
        } catch (error) {
            console.error('Register error:', error);
            return {
                success: false,
                error: 'Помилка при реєстрації. Спробуйте ще раз.'
            };
        }
    },

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return true;
        }
        return false;
    },

    logout(): void {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}; 
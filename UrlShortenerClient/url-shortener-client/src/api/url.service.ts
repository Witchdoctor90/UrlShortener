import api from './api';
import { API_ENDPOINTS } from './api.docs';

export interface ShortUrlResponse {
    id: string;
    longUrl: string;
    shortCode: string;
    createdAt: string;
    userId: string;
}

interface ShortenUrlResponse {
    success: boolean;
    data?: {
        shortUrl: string;
    };
    error?: string;
}

const SERVER_BASE_URL = 'http://localhost:5243';

export const urlService = {
    async shortenUrl(url: string): Promise<ShortenUrlResponse> {
        try {
            const response = await api.post<ShortUrlResponse>(
                API_ENDPOINTS.SHORT_URLS.CREATE,
                url
            );

            if (response.data) {
                const shortUrl = `${SERVER_BASE_URL}/short/${response.data.shortCode}`;
                return { 
                    success: true, 
                    data: { shortUrl } 
                };
            }

            return {
                success: false,
                error: 'Помилка при скороченні URL. Спробуйте ще раз.'
            };
        } catch (error) {
            console.error('Shorten URL error:', error);
            return {
                success: false,
                error: 'Помилка при скороченні URL. Спробуйте ще раз.'
            };
        }
    },

    async getUserUrls(): Promise<ShortUrlResponse[]> {
        try {
            const response = await api.get<ShortUrlResponse[]>(API_ENDPOINTS.SHORT_URLS.GET_ALL);
            return response.data;
        } catch (error) {
            console.error('Get user URLs error:', error);
            return [];
        }
    },

    async deleteUrl(id: string): Promise<boolean> {
        try {
            await api.delete(`${API_ENDPOINTS.SHORT_URLS.DELETE}/${id}`);
            return true;
        } catch (error) {
            console.error('Delete URL error:', error);
            return false;
        }
    }
}; 
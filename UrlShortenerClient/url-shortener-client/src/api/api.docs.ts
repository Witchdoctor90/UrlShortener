/**
 * Документація API для сервісу скорочення посилань
 * 
 * Базовий URL: http://localhost:5243
 * 
 * Аутентифікація:
 * - Всі запити, крім реєстрації та входу, вимагають JWT токен
 * - Токен передається в заголовку Authorization: Bearer <token>
 * 
 * Формати відповідей:
 * - Успішна відповідь: { success: true, data: ... }
 * - Помилка: { success: false, error: string }
 * 
 * Коди помилок:
 * - 400: Неправильний запит
 * - 401: Не авторизовано
 * - 403: Доступ заборонено
 * - 404: Ресурс не знайдено
 * - 500: Помилка сервера
 */

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login'
    },
    SHORT_URLS: {
        CREATE: '/ShortUrls/Create',
        GET_BY_ID: '/ShortUrls/GetById',
        GET_ALL: '/ShortUrls/GetAll',
        DELETE: '/ShortUrls/Delete'
    },
    URL: {
        SHORTEN: '/url/shorten'
    }
}; 
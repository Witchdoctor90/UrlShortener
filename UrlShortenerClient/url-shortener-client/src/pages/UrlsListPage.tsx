import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { urlService } from '../api/url.service';
import { ShortUrlResponse } from '../api/url.service';

const UrlsListPage: React.FC = () => {
    const { logout } = useAuth();
    const [urls, setUrls] = useState<ShortUrlResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUrls();
    }, []);

    const loadUrls = async () => {
        try {
            setIsLoading(true);
            const userUrls = await urlService.getUserUrls();
            setUrls(userUrls);
        } catch (err) {
            setError('Помилка при завантаженні URL');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Ви впевнені, що хочете видалити це посилання?')) {
            try {
                const success = await urlService.deleteUrl(id);
                if (success) {
                    setUrls(urls.filter(url => url.id !== id));
                } else {
                    setError('Помилка при видаленні URL');
                }
            } catch (err) {
                setError('Помилка при видаленні URL');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('uk-UA');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">URL Shortener</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={logout}
                                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Вийти
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Мої скорочені посилання</h2>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="text-center py-4">Завантаження...</div>
                        ) : urls.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">
                                У вас ще немає скорочених посилань
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Оригінальне посилання
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Скорочене посилання
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Створено
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Дії
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {urls.map((url) => (
                                            <tr key={url.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <a
                                                        href={url.longUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {url.longUrl}
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <a
                                                        href={`http://localhost:5243/short/${url.shortCode}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {`http://localhost:5243/short/${url.shortCode}`}
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(url.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleDelete(url.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Видалити
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UrlsListPage; 
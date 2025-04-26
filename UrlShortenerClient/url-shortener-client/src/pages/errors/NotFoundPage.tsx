import React from 'react';
import ErrorPage from '../../components/errors/ErrorPage';

const NotFoundPage: React.FC = () => {
    return (
        <ErrorPage
            statusCode={404}
            title="Сторінку не знайдено"
            message="Вибачте, але сторінка, яку ви шукаєте, не існує."
        />
    );
};

export default NotFoundPage; 
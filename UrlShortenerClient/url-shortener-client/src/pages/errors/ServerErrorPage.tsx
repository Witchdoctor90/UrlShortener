import React from 'react';
import ErrorPage from '../../components/errors/ErrorPage';

const ServerErrorPage: React.FC = () => {
    return (
        <ErrorPage
            statusCode={500}
            title="Помилка сервера"
            message="Вибачте, сталася помилка на сервері. Спробуйте пізніше."
        />
    );
};

export default ServerErrorPage; 
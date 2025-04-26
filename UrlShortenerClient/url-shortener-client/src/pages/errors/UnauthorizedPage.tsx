import React from 'react';
import ErrorPage from '../../components/errors/ErrorPage';

const UnauthorizedPage: React.FC = () => {
    return (
        <ErrorPage
            statusCode={401}
            title="Не авторизовано"
            message="Для доступу до цієї сторінки потрібно увійти в систему."
        />
    );
};

export default UnauthorizedPage; 
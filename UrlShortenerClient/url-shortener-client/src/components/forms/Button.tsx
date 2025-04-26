import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    isLoading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ 
    children, 
    isLoading, 
    disabled, 
    ...props 
}) => {
    return (
        <MuiButton
            variant="contained"
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Завантаження...' : children}
        </MuiButton>
    );
};

export default Button; 
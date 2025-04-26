import React from 'react';
import { Box, Paper } from '@mui/material';

interface FormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, width: '100%' }}>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {children}
            </Box>
        </Paper>
    );
};

export default Form; 
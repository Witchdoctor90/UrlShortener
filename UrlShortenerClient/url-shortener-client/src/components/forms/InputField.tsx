import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputFieldProps extends Omit<TextFieldProps, 'error'> {
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ error, ...props }) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error}
            {...props}
        />
    );
};

export default InputField; 
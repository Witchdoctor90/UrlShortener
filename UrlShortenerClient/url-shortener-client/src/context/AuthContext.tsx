import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/auth.service';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = authService.getToken();
        if (token) {
            authService.isAuthenticated();
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await authService.login({ Username: username, Password: password });
        if (response.success) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const register = async (username: string, password: string) => {
        const response = await authService.register({ Username: username, Password: password });
        if (response.success) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 
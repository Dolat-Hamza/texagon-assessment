// context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { message } from "antd";

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (values) => {
        console.log(values)
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(values)); // Store user data
                setUser(values); // Update user state
                setIsAuthenticated(true);
                message.success('Login successful!');
            } else {
                const errorData = await response.json();
                message.error(errorData.error);
            }
        } catch (error) {
            message.error('An error occurred during login. Please try again.');
        }
    };
    const register = async (values) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Registration successful! You can now log in.');

            } else {
                const errorData = await response.json();
                message.error(errorData.error);
            }
        } catch (error) {
            message.error('An error occurred during registration. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setIsAuthenticated(false);
    };

    const contextValue = { isAuthenticated, user, login, logout, register };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };

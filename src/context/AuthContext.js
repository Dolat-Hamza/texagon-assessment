// context/AuthContext.js
import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Simulate fetching user data after authentication (replace with your logic)
    useEffect(() => {
        const fetchUserData = async () => {
            if (isAuthenticated) {
                // const userData = await  /* Your fetch logic to get user details */;
                // setUser(userData);
            }
        };

        fetchUserData();
    }, [isAuthenticated]);

    const login = async (credentials) => {
        // Your login logic...
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Your logout logic...
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

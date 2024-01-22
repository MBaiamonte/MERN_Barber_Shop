import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    
    const login = async (newToken) => {
    setToken(newToken);
    };

    const logout = () => {
        setToken(null);
        handleBackendLogout();
    };

    const handleBackendLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/logout',null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            console.log("token:", token)
            );
    
        if (response.status ===200) {
            console.log('Backend logout successful');
            console.log(token)
        } else {
            console.error('Failed to perform backend logout');
        }
        } catch (error) {
            console.error('Error during backend logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

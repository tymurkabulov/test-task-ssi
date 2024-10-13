import React, {createContext, useContext, useState, useEffect, ReactNode, FC} from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    loading: boolean;
}


interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth") === "true";
        setIsAuthenticated(isAuth);
        setLoading(false);
    }, []);

    const login = () => {
        localStorage.setItem("isAuth", "true");
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("isAuth");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('authorization error');
    }
    return context;
};

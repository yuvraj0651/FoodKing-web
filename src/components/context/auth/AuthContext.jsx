import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (email, password) => {
        if (email === "yuvraj0651@gmail.com" && password === "12345678") {
            const loggedUser = {
                name: Admin,
                email: email
            };
            setUser(loggedUser);
            localStorage.setItem("user", JSON.stringify(loggedUser));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}


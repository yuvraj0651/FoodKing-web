import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {

    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark(prev => !prev)      

    return (
        <ThemeContext.Provider value={{isDark , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
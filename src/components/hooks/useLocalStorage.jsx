import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialState) => {
    const [storedValue, setStoredValue] = useState(() => {
        const existingItem = localStorage.getItem(key)

        return existingItem ? JSON.parse(existingItem) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue))
    }, [key, storedValue]);

    return [storedValue, setStoredValue]
}

import { useState } from "react";

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState)

    const toggleTheme = () => {
        return setState(prev => !prev)
    }

    return [state, toggleTheme]
}   


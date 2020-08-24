import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
    const [speed, setSpeed] = useState(100);
    const [isRunning, setIsRunning] = useState(false)

    return (
        <AppContext.Provider value={[speed, setSpeed, isRunning, setIsRunning]}>
            {props.children}
        </AppContext.Provider>
    )
}
import React, { createContext, useState, useRef } from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
    const [speed, setSpeed] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const [numCols, setNumCols] = useState(20);
    const [numRows, setNumRows] = useState(25);

    return (
        <AppContext.Provider value={[speed, setSpeed, isRunning, setIsRunning, numRows, setNumRows, numCols, setNumCols]}>
            {props.children}
        </AppContext.Provider>
    )
}
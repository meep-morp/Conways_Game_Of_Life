import React, { createContext, useState, useRef } from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
    const [speed, setSpeed] = useState(200);
    const [isRunning, setIsRunning] = useState(false)
    let [gen, setGen] = useState(0)

    const genRef = useRef(gen)
    genRef.current = gen
    const speedRef = useRef(speed)
    speedRef.current = speed

    return (
        <AppContext.Provider value={[speed, setSpeed, isRunning, setIsRunning, genRef, gen, setGen, speedRef]}>
            {props.children}
        </AppContext.Provider>
    )
}
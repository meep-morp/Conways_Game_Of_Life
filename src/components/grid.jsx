import React, { useCallback, useRef, useContext } from 'react';
import playImg from "../assets/PLayIcon.svg";
import pauseImg from "../assets/pauseIcon.svg";
import randomImg from "../assets/randomIcon.svg";
import clearImg from "../assets/clearImg.svg";
// This allows use to mutate our array without making extra copies to take up memory, or pain stakingly spread the values in ->
import produce from 'immer';
import { useState } from 'react';
import { AppContext } from '../context/AppContext';

const numCols = 50; // width
const numRows = 25; // height

// Generates a 2d Array from the specified num of cols and rows, and fills it with the bool false, meaning the cells start out dead. Returns the grid.
const TwoDArray = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
};

// This contains the the coordinates for the surrounding cells in a grid
const neighbors = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
]

const Grid = props => {
    // STATES
    let [speed, setSpeed, isRunning, setIsRunning, genRef, gen, setGen, speedRef] = useContext(AppContext)

    const [grid, setGrid] = useState(() => {
        return TwoDArray();
    });

    // Keep up with current state of running
    const runningRef = useRef(isRunning);
    runningRef.current = isRunning

    // FUNCTIONS
    const randomize = () => {
        setIsRunning(false)
        setGen(0)
        setGrid(() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                rows.push(Array.from(Array(numCols), () => Math.round(Math.random(0, 1))));
            }

            return rows;
        })
    }

    const clear = () => {
        setIsRunning(false)
        setGen(0)
        setGrid(() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                rows.push(Array.from(Array(numCols), () => 0));
            }

            return rows;
        })
    }

    // useCallback prevents the function from being recreated every render
    const run = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        // Add to generation count
        setGen(gen += 1)
        // Updating grid state
        setGrid((newGrid) => {
            return produce(newGrid, gridCopy => {
                // Grid Simulation ->
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let numNeighbors = 0;
                        neighbors.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            // Ensure it does not count OOB
                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                                numNeighbors += newGrid[newI][newJ];
                            }
                        })
                        // Implement rules
                        if (numNeighbors < 2 || numNeighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (newGrid[i][j] === 0 && numNeighbors === 3) {
                            gridCopy[i][j] = 1;
                        }

                    }
                }
            })
        })


        // timeout acts as the FPS of simulation, recursively
        setTimeout(run, parseInt(speedRef.current))

    }, []);

    return (
        <div className="grid-container">
            <h3>Generation: {genRef.current}</h3>
            <div className="grid" style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numCols}, 20px)`
            }}>
                {/* Mapping throught the grid to display it in the browser window. Index is used to control the state of the cell */}
                {grid.map((rows, i) => rows.map((cols, j) => (
                    <div
                        className="cell"
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = !grid[i][j]
                            });
                            setGrid(newGrid);
                        }}
                        style={{
                            width: 20, height: 20,
                            background: grid[i][j] ? 'radial-gradient(circle, rgba(77,207,224,1) 0%, rgba(17,133,224,1) 100%)' : undefined,
                            border: 'solid 1.3px white'
                        }}
                    />
                )))}
            </div>
            <div className="buttons">
                <div className="button" onClick={
                    () => {
                        setIsRunning(!isRunning)
                        if (!isRunning) {
                            runningRef.current = true
                            run()
                        }
                    }
                } >
                    {
                        isRunning ? <img className="button-img" src={pauseImg} alt="play" /> : <img className="button-img" src={playImg} alt="pause" />
                    }
                </div>
                <div className="button"
                    onClick={() => [
                        randomize()
                    ]}
                >
                    <img src={randomImg} alt="" />
                </div>
                <div className="button"
                    onClick={() => {
                        clear()
                    }}
                >
                    <img src={clearImg} alt="clear" />
                </div>
            </div>
        </div>
    )
}

export default Grid
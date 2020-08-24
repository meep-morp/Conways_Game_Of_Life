import React, { useCallback, useRef } from 'react';
import playImg from "../assets/PLayIcon.svg";
import pauseImg from "../assets/pauseIcon.svg";
import randomImg from "../assets/randomIcon.svg";
import clearImg from "../assets/clearImg.svg";
// This allows use to mutate our array without making extra copies to take up memory, or pain stakingly spread the values in ->
import produce from 'immer';
import { useState } from 'react';

const numCols = 25;
const numRows = 25;

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
    const [grid, setGrid] = useState(() => {
        return TwoDArray();
    });
    const [isRunning, setIsRunning] = useState(false)

    const randomize = () => {
        setGrid(() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                rows.push(Array.from(Array(numCols), () => Math.round(Math.random(0, 1))));
            }

            return rows;
        })
    }

    const clear = () => {
        setGrid(() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                rows.push(Array.from(Array(numCols), () => 0));
            }

            return rows;
        })
    }

    // Keep up with current state of running
    const runningRef = useRef(isRunning);
    runningRef.current = isRunning

    // useCallback prevents the function from being recreated every render
    const run = useCallback(() => {

        if (!runningRef.current) {
            return;
        }

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
                        console.log(numNeighbors)
                        // Implement rules
                        if (numNeighbors < 2 || numNeighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (newGrid[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }

                    }
                }
            })
        })


        // timeout acts as the FPS of simulation, recursively
        setTimeout(run, 100)

    }, []);

    return (
        <>
            <div className="grid" style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numCols}, 20px)`
            }}>
                {/* Mapping throught the grid to display it in the browser window. Index is used to control the state of the cell */}
                {grid.map((rows, i) => rows.map((cols, j) => (
                    <div
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = !grid[i][j]
                            });
                            setGrid(newGrid);
                        }}
                        style={{
                            width: 20, height: 20,
                            background: grid[i][j] ? '#1edada' : undefined,
                            border: 'solid 1.3px black'
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
        </>
    )
}

export default Grid
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { produce } from "immer";

const Options = props => {
    const [options, setOptions] = useState(true)
    const [speed, setSpeed, isRunning, setIsRunning, numRows, setNumRows, numCols, setNumCols] = useContext(AppContext)

    const onChangeHandler = (e) => {
        setSpeed(e.target.value)
    }

    setNumRows(25)
    return (
        <div className="options-container">
            <div className="tabs">
                <button
                    onClick={() => {
                        if (!options)
                            setOptions(true)
                    }}
                >Options</button>
                <button
                    onClick={() => {
                        if (options)
                            setOptions(false)
                    }}
                >Rules</button>
            </div>
            <div className="options">
                {
                    options
                        ? <div className="options-bar">
                            <p>Speed</p>
                            <label htmlFor="speed" className="SR_Only" >Desired Speed in Milliseconds</label>
                            <input type="range" min={100} max={4000} name="speed" onChange={onChangeHandler} />
                            {speed}ms
                            <p>Grid Size</p>
                            <div className="radios">
                                <label htmlFor="50x25" className="SR_Only" >50 by 25 grid size</label>
                                <input className="size-button fifty25" type="radio" name="50x25" onChange={() => {
                                    setNumCols(50)
                                    setNumRows(25)
                                }} />
                                <label htmlFor="50x25" className="SR_Only" >30 by 25 grid size</label>
                                <input className="size-button thirty25" type="radio" name="50x25" onChange={() => {
                                    setNumCols(30)
                                    setNumRows(25)
                                }} />
                                <label htmlFor="50x25" className="SR_Only" >20 by 25 grid size</label>
                                <input className="size-button twenty25" type="radio" name="50x25" onChange={() => {
                                    setNumCols(20)
                                    setNumRows(25)
                                }} />
                            </div>

                        </div>
                        : <div className="rules">
                            <h3>The Rules of Game of Life</h3>
                            <ul>
                                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                            </ul>
                            <p>Click to draw and see what happens!</p>
                            <h3>External Links</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wiki</a>
                        </div>
                }
            </div>
        </div>
    )
}

export default Options
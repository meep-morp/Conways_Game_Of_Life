import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Options = props => {
    const [options, setOptions] = useState(true)
    const [speed, setSpeed, isRunning, setIsRunning] = useContext(AppContext)
    console.log(speed)

    const onChangeHandler = (e) => {
        setIsRunning(false)
        setSpeed(e.target.value)
        setIsRunning(true)
    }
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
                            {speed}
                        </div>
                        : <div className="rules">
                            <h3>The Rules of Game of Life</h3>
                            <ul>
                                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                            </ul>
                            <h3>External Links</h3>
                            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wiki</a>
                        </div>
                }
            </div>
        </div>
    )
}

export default Options
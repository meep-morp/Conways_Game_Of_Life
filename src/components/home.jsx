import React, { useEffect, useRef } from 'react';
import git from "../assets/gitLogo.svg";
import { Link } from 'react-router-dom';

const Home = props => {
    return (
        <div className="home">
            <h1>THE GAME OF LIFE</h1>
            <h3 className="author">By John Conway</h3>
            <div className="button">
                <Link className="button-link" to="/cells">SIMULATE</Link>
            </div>
            <a href="https://github.com/meep-morp/Conways_Game_Of_Life" target="_blank" rel="noopener noreferrer" className="gitLink">
                <img src={git} alt="" />
            </a>
        </div >
    )
}

export default Home
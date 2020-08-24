import React from 'react';
import git from "../assets/gitLogo.svg";
import { Link } from 'react-router-dom';

const Home = props => {
    const container = document.querySelector(".grid-container");
    const options = document.querySelector(".options-container")
    const onClickHandler = e => {
        console.log("clicked")
        container.classList.add("fade-in")
        options.classList.add("fade-in")
    }
    return (
        <div className="home">
            <h1>THE GAME OF LIFE</h1>
            <h3 className="author">By John Conway</h3>
            <div className="button" onClick={onClickHandler}>
                <Link className="button-link" to="/cells">SIMULATE</Link>
            </div>
            <a href="https://github.com/meep-morp/Conways_Game_Of_Life" target="_blank" rel="noopener noreferrer" className="gitLink">
                <img src={git} alt="" />
            </a>
        </div >
    )
}

export default Home
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./styles/css/index.css";
import Grid from "./components/grid";
import Options from "./components/options";
import { AppProvider } from "./context/AppContext";
import Home from "./components/home";
function App() {
	return (
		<AppProvider>
			<Router>
				<div className="App">
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/cells">
						<Grid />
						<Options />
					</Route>
				</div>
			</Router>
		</AppProvider>
	);
}

export default App;

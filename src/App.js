import React, { useState } from "react";
import "./styles/css/index.css";
import Grid from "./components/grid";
import Options from "./components/options";
import { AppProvider } from "./context/AppContext";
function App() {
	return (
		<AppProvider>
			<div className="App">
				<Grid />
				<Options />
			</div>
		</AppProvider>
	);
}

export default App;

import React from "react";
import bgVideo from "./assets/Network.webm"
import "./styles/css/index.css";

function App() {
  return (
    <div className="App">
      <video src={bgVideo}></video>
    </div>
  );
}

export default App;

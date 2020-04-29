import React from "react";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App" onKeyPress={(e) => console.log(e)}>
      <Home></Home>
    </div>
  );
}

export default App;

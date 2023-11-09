//import logo from './logo.svg';
import './App.css';
import React from "react";
import Model from "./model/Model.js";
import {redrawCanvas} from "./boundary/Boundary.js";
import {adjust} from "./controller/Controller.js";
import {layout} from "./Layout.js";

//@ts-check

export default function App() {

  const [model, setModel] = React.useState(new Model(5,10,15));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(
    () => {
      redrawCanvas(model, canvasRef.current, appRef.current);
    } , [model]);

  const adjustController = (direction) => {
    let newModel = adjust(model, direction);

    setModel(newModel);
  }

  return (
    <main style={layout.Appmain} ref = {appRef}>
      <canvas className={layout.canvas}
        ref = {canvasRef}
        width = {layout.canvas.width}
        height= {layout.canvas.height}
      >
      </canvas>
      <div style = {layout.resetButton}>
        <button class="reset_button" onClick={(e) => adjustController(+1)}>RESET</button>
      </div>

      <p style = {layout.moveCount}>{"Move Count: " + 20}</p>
      <p style = {layout.score}>{"Score: " + model.value}</p>
      
      

      <div style = {layout.upperButtons}>
        <button class="arrow_button" onClick={(e) => adjustController(+1)}>&uarr;</button>
        
      </div>
      <div style = {layout.lowerButtons}>
        <button class="arrow_button" onClick={(e) => adjustController(+1)}>&larr;</button>
        <button class="arrow_button" onClick={(e) => adjustController(-1)}>&darr;</button>
        <button class="arrow_button" onClick={(e) => adjustController(-1)}>&rarr;</button>
      </div>
    </main>
  );
}


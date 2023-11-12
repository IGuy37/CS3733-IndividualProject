//import logo from './logo.svg';
import './App.css';
import React from "react";
import {redrawCanvas} from "./boundary/Boundary.js";
import {moveNinjaSe, remove2x2, initModel} from "./Controller.js";
import {layout} from "./Layout.js";

//@ts-check

export default function App() {

  let n = 5;

  const [model, setModel] = React.useState(initModel(n));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);


  React.useEffect(
    () => {
      redrawCanvas(model, canvasRef.current, appRef.current);
    } , [model]);

  const moveNinjaSeHandler = (xDir, yDir) => {
    let newModel = moveNinjaSe(model, xDir, yDir);
    setModel(newModel);
  }

  const resetHandler = () => {
    if(model != null){
      n = model.board.numRows;
    }
    let newModel = initModel(n);
    setModel(newModel);
  }

  const removeHandler = () => {
    let newModel = remove2x2(model);
    setModel(newModel);
  }

  const configSelectHandler = (configNumber) => {
    n = configNumber;
    let newModel = initModel(n);
    setModel(newModel);
  }

  return (
    <main style={layout.Appmain} ref = {appRef}>
      <div class="canvas">
        <canvas className={layout.canvas}
            ref = {canvasRef}
            width = {layout.canvas.width}
            height= {layout.canvas.height}
          >
        </canvas>
      </div>
      
      <div style = {layout.resetButton}>
        <button class="reset_button" onClick={(e) => resetHandler()}>RESET</button>
      </div>

      <p style = {layout.moveCount}>{"Move Count: " + model.moveCount}</p>
      <p style = {layout.score}>{"Score: " + model.score}</p>
      
      <div style = {layout.removeButton}>
        <button class="reset_button" onClick={(e) => removeHandler()}>Remove</button>
      </div>

      <div style = {layout.upperButtons}>
        <button class="arrow_button" onClick={(e) => moveNinjaSeHandler(0,-1)}>&uarr;</button>
        
      </div>
      <div style = {layout.lowerButtons}>
        <button class="arrow_button" onClick={(e) => moveNinjaSeHandler(-1,0)}>&larr;</button>
        <button class="arrow_button" onClick={(e) => moveNinjaSeHandler(0,1)}>&darr;</button>
        <button class="arrow_button" onClick={(e) => moveNinjaSeHandler(1,0)}>&rarr;</button>
      </div>
      <p style= {layout.configSelect}>Configuration Select</p>
      <div style = {layout.configSelectButtons}>
        <button class="config_select_button" onClick={(e) => configSelectHandler(5)}>Configuration #1 (5x5)</button>
        <button class="config_select_button" onClick={(e) => configSelectHandler(4)}>Configuration #2 (4x4)</button>
        <button class="config_select_button" onClick={(e) => configSelectHandler(6)}>Configuration #3 (6x6)</button>
      </div>


      <CongratulationsMessage gameIsOver = {!model.gameIsActive}/>

    </main>
  );
}



function CongratulationsMessage({gameIsOver}){
    return(
      <>
        {gameIsOver && <p style={layout.congratulationsMessage}>Congratulations! You Won!</p>}
      </>
    );
}


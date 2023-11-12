import {config_4x4, config_5x5, config_6x6} from "./config.js";
import Ninjase from "./Ninjase.js";
import Square from "./Square.js";

export default class Board{

    constructor(configNumber){
        let config = this.getConfig(configNumber);
        this.numRows = Number(config.numRows);
        this.numCols = Number(config.numColumns);
        this.ninjase = new Ninjase(Number(config.ninjaRow) - 1, this.toNumberBasedColumn(config.ninjaColumn));
        this.squares = this.initializeSquares(config);
    }

    canMoveNinjaSe(xDir, yDir){
        return this.ninjase.canMove(xDir, yDir, this.numRows, this.numCols);
    }

    moveNinjaSe(xDir, yDir){
        this.ninjase.move(xDir,yDir, this.numRows, this.numCols);
        let x = this.ninjase.topLeftCol;
        let y = this.ninjase.topLeftRow;
        let [score, movedSquares] = this.handleNinjaseCollisions(xDir, yDir, x, y);
        while(this.squaresAreColliding()){
            score += this.handleCascadingCollisions(xDir, yDir, movedSquares);
        }
        return score;
    }

    handleNinjaseCollisions(xDir, yDir, x, y){
        let score = 0;
        let movedSquares = [];
        for(let r = y; r < y + this.ninjase.size; r++){
            for(let c = x; c < x + this.ninjase.size; c++){
                let thisSquare = this.getSquareAt(c, r);
                if(thisSquare !== null){
                    thisSquare.move(xDir, yDir, this.numRows, this.numCols);
                    movedSquares.push(thisSquare);
                    score++;
                }
            }
        }
        return [score, movedSquares];
    }

    handleCascadingCollisions(xDir, yDir, movedSquares){
        let score = 0;
        for(let i = 0; i < this.squares.length; i++){
            for(let j = i+1; j < this.squares.length; j++){
                if(this.squares[i].collidesWith(this.squares[j])){
                    console.log("Cascading Collision Detected.");
                    if(movedSquares.includes(this.squares[i])){
                        this.squares[j].move(xDir, yDir, this.numRows, this.numCols);
                        movedSquares.push(this.squares[j]);
                    } else {
                        this.squares[i].move(xDir, yDir, this.numRows, this.numCols);
                        movedSquares.push(this.squares[i]);
                    }
                    
                    score++;
                }
            }
        }
        return score;
    }

    squaresAreColliding(){
        for(let i = 0; i < this.squares.length; i++){
            for(let j = i+1; j < this.squares.length; j++){
                if(this.squares[i].collidesWith(this.squares[j])){
                    return true;
                }
            }
        }
        return false;
    }

    getSquareAt(x, y){
        for(let i = 0; i < this.squares.length; i++){
            if(this.squares[i].x === x && this.squares[i].y === y){
                return this.squares[i];
            }
        }
        return null;
    }

    hasNinjaSe(x, y){
        return this.ninjase.contains(x, y);
    }

    getColor(x, y){
        let thisSquare = this.getSquareAt(x, y);
        if(thisSquare == null){
            if(this.hasNinjaSe(x, y)){
                return "#22b14c";
            }
            return "black";
        }
        return thisSquare.color;
    }

    remove(){
        if(this.has2x2OfOneColor()){
            let [row, col] = this.get2x2OfOneColor();
            console.log("Top left corner: " + col + ", " + row);
            this.deleteSquare(row, col);
            this.deleteSquare(row + 1, col);
            this.deleteSquare(row, col + 1);
            this.deleteSquare(row + 1, col + 1);
            return true;
        }
       return false; 
        
    }
  

    deleteSquare(row, col){
        let index = this.squares.indexOf(this.getSquareAt(col, row));
        let removedSquare = this.squares.splice(index, 1);
        return removedSquare;
    }

    gameIsOver(){
        console.log("Squares length = " + this.squares.length);
        return this.squares.length === 0;
    }

    has2x2OfOneColor(){
        return this.get2x2OfOneColor() !== null
    }

    get2x2OfOneColor(){
        for(let c = 0; c < this.numCols - 1; c++){
            for(let r = 0; r < this.numRows - 1; r++){
                let topLeftColor = this.getColor(c, r);
                let topRightColor = this.getColor(c + 1, r);
                let bottomLeftColor = this.getColor(c, r + 1);
                let bottomRightColor = this.getColor(c + 1, r + 1);
                if(this.areAllEqual(topLeftColor, topRightColor, bottomLeftColor, bottomRightColor) && this.getSquareAt(c, r) !== null)
                    return [r, c];
            }
        }
        return null;
    }

    areAllEqual(a, b, c, d){
        return a === b && b === c && c === d;
    }

    getConfig(configNumber){
        switch(configNumber){
            case 4:
                return config_4x4;
            case 5:
                return config_5x5;
            case 6:
                return config_6x6;
            default:
                console.log("Invalid configuration");
                return null;
        }
    }


    toNumberBasedColumn(colAsString){
        return colAsString.charCodeAt(0) - 65; //65 is the ascii code for Capital A
    }

    initializeSquares(config){
        let result = [];
        for(let i = 0; i < config.initial.length; i++){
            let thisEntry = config.initial[i];
            //console.log("hello");
            result[i] = new Square(
                thisEntry.color, this.toNumberBasedColumn(thisEntry.column), Number(thisEntry.row) - 1, 
            );
        }
        return result;
    }
}
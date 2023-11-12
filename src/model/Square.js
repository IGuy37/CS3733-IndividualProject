export default class Square {

    constructor(color, x, y){
        this.color = color;
        this.x = x;
        this.y = y;
    }

    move(xDir, yDir, numRows, numCols){
        //console.log("Direction to move: " + xDir + ", " + yDir);
        this.x += xDir;
        if(this.x >= numCols){
            this.x -= numCols;
        } else if(this.x < 0){
            this.x += numCols;
        }
        this.y += yDir;
        if(this.y >= numRows){
            this.y -= numRows;
        } else if(this.y < 0){
            this.y += numRows;
        }
        //console.log("Moved to " + this.x + ", " + this.y);
    }

    collidesWith(otherSquare){
        return this.x === otherSquare.x && this.y === otherSquare.y;
    }
}
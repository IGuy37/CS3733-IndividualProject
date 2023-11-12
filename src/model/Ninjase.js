export default class Ninjase {

    constructor(row, col){
        this.size = 2; //hardcode for now, can support growing / shrinking later if need be
        this.topLeftCol = col;
        this.topLeftRow = row;
    }

    contains(x, y){
        let withinHorizontalDist =  (x - this.topLeftCol) < this.size && (x - this.topLeftCol) >= 0;
        let withinVerticalDist = (y - this.topLeftRow) < this.size && (y - this.topLeftRow) >= 0;
        return withinHorizontalDist && withinVerticalDist;
    }


    /*
    * canMove: number, number, number, number -> boolean
    * Checks if Ninja-se can move in a specified direction on a board of size numRows by numCols.
    */
    canMove(xDir, yDir, numRows, numCols){
        let canPushInXDir = (this.topLeftCol + xDir >= 0 && (this.topLeftCol + this.size) + xDir <= numRows);
        let canPushInYDir = (this.topLeftRow + yDir >= 0 && (this.topLeftRow + this.size) + yDir <= numCols);
        return canPushInXDir && canPushInYDir;
    }

    /*
    * move: number, number, number, number -> boolean
    * Moves Ninja-se in a specified direction on a board of size numRows by numCols, if possible.
    */
    move(xDir, yDir, numRows, numCols){
        if(this.canMove(xDir, yDir, numRows, numCols)){
            this.topLeftCol += xDir;
            this.topLeftRow += yDir;
            //console.log("Moved to row " + this.topLeftRow + ", col " + this.topLeftCol);
            return true;
        }
        //console.log("Didn't move. Stayed at row " + this.topLeftRow + ", col " + this.topLeftCol);
        return false;
    }

    
}
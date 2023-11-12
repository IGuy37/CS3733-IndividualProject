//
export default class Model {
    
    constructor(board, score, moveCount, gameIsActive){
        this.board = board;
        this.score = score;
        this.moveCount = moveCount;
        this.gameIsActive = gameIsActive;
    }

    copy(){
        return new Model(this.board, this.score, this.moveCount, this.gameIsActive);
    }
    

    getColor(x, y){
        return this.board.getColor(x, y);
    }

    remove(){
        if(this.board.remove()){
            this.moveCount++;
            this.score += 4;
            this.gameIsActive = !this.board.gameIsOver();
            return true;
        }
        return false;
    }

    moveNinjaSe(xDir, yDir){
        //console.log("Is the game active? " + this.gameIsActive);
        if(this.board.canMoveNinjaSe(xDir, yDir) && this.gameIsActive){
            this.score += this.board.moveNinjaSe(xDir, yDir);
            this.moveCount++;
        }
    }
    


}

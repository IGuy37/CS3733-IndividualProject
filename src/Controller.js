import Model from "./model/Model.js";
import Board from "./model/Board.js";
/*
* moveNinjaSe: Model, number, number -> Model
* Moves NinjaSe and returns a copy of the resulting model.
*/
export function moveNinjaSe(model, xDir, yDir){
    model.moveNinjaSe(xDir, yDir);
    return model.copy();
}

export function remove2x2(model){
    model.remove();
    return model.copy();
}

export function initModel(configNumber){
    return new Model(new Board(configNumber), 0, 0, true);
}
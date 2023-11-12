export function redrawCanvas(model, canvasObj, appObj){
    const ctx = canvasObj.getContext("2d");

    //clear the canvas area before rendering objects to it
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);

    let n = model.board.numRows;
    let startX = 50;
    let startY = 50;
    for(let r = 0; r < n; r++){
        for(let c = 0; c < n; c++){
            drawBorder(startX, startY, c, r, 510/n, canvasObj);
            fillSquare(startX, startY, c, r, 510/n, model, canvasObj);
        }
    }
}

function fillSquare(startX, startY, x, y, size, model, canvasObj){
    const ctx = canvasObj.getContext("2d");
    ctx.fillStyle = model.getColor(x, y);
    ctx.fillRect(startX + size * x, startY + size * y, size, size);
}

/*
* drawBorder: number, number, number, canvas object -> void
* draws a hollow square with a given x and y coordinate, size, and canvas 
*/
function drawBorder(startX, startY, x, y, size, canvasObj){
    const ctx = canvasObj.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(startX + size * x, startY + size * y, size, size);
    ctx.stroke();
}
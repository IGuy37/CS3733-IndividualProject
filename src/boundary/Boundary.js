export function redrawCanvas(model, canvasObj, appObj){
    const ctx = canvasObj.getContext("2d");

    //clear the canvas area before rendering objects to it
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)
    ctx.fillStyle = "#3b3b3b";
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);

    let v = model.value;
    ctx.fillStyle = "yellow";
    ctx.fillRect(100, 100, 10 * v, 10 * v);

    // ctx.beginPath();
    // ctx.strokeStyle = "blue";
    // ctx.rect(50, 75, 500, 500);
    // ctx.stroke();
}
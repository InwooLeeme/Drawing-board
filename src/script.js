const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let pressed = false;

canvas.width = 600;
canvas.height = 600;

ctx.strokeStyle = "black";          // default line color : black
ctx.lineWidth = 2.5;                // default line width : 2.5

function stopDrawing(event){
    pressed = false;
    document.body.style.cursor = "default";
}

function drawing(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(!pressed){       // true
        ctx.beginPath();        // 경로 시작
        //ctx.moveTo(x,y);        // x,y좌표로 펜을 이동
    }
    else{
        ctx.lineTo(x,y);        // x,y까지 선을 그림
        ctx.stroke();           // 경로 명령
        
    }
    
}

function mousedown(event){
    pressed = true;
    document.body.style.cursor = "crosshair";
}


if(canvas){
    canvas.addEventListener('mousemove',drawing);
    canvas.addEventListener('mousedown',mousedown);
    canvas.addEventListener('mouseup',stopDrawing);
}
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName('color');
const colorArray = Array.from(color);
const brushRange = document.getElementById('brushRange');
const fillBtn = document.querySelector('.fillBtn');
const clearBtn = document.querySelector('.clearBtn');
const saveBtn = document.querySelector('.saveBtn');

let pressed = false;
let filled = false;

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
        ctx.moveTo(x,y);        // x,y좌표로 펜을 이동
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

function changeBushColor(event){
    const currentColor = event.target;
    const getBackgroundColor = getComputedStyle(currentColor).backgroundColor;
    ctx.strokeStyle = getBackgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
}

function changeLineWidth(){
    const lineWidth = brushRange.value;
    ctx.lineWidth = lineWidth;
}

function fillTheBoard(){
    if(filled === true)
    {
        filled = false;
        fillBtn.innerText = `Fill`;         // canvas 채우기 가능
        
    }
    else{
        filled = true;
        fillBtn.innerText = `Paint`;        // canvas에 그리기 가능
    }
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function cleaarFunction(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function clickFillCanvas(){
    if(filled === true){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function savePicture(){
    const imageData = canvas.toDataURL();
    let downloadLink = document.createElement('a');
    downloadLink.href = imageData;
    downloadLink.download = 'Drawing Board Image.png';
    downloadLink.click();
}

function preventContextMenu(event){
    event.preventDefault();
    
}

if(canvas){
    canvas.addEventListener('mousemove',drawing);
    canvas.addEventListener('mousedown',mousedown);
    canvas.addEventListener('mouseup',stopDrawing);
    brushRange.addEventListener('input',changeLineWidth);
    fillBtn.addEventListener('click',fillTheBoard);
    clearBtn.addEventListener('click',cleaarFunction);
    canvas.addEventListener('click',clickFillCanvas);
    canvas.addEventListener('contextmenu',preventContextMenu);
}

colorArray.forEach(color => {
    color.addEventListener('click',changeBushColor);    
});

if(saveBtn){
    saveBtn.addEventListener('click',savePicture);
}
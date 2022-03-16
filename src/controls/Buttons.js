import Queue from "../data-structures/Queue.js";
var queue = new Queue();
var queueDiv = new Queue();
var btnUp = document.getElementById("up");
var btnDown = document.getElementById("down");
var btnRight = document.getElementById("right");
var btnLeft = document.getElementById("left");
var btnStart = document.getElementById("start");
var btnRemove = document.getElementById("remove");
var gridMove = document.getElementById("grid-queue");
var btnTryAgain = document.getElementById("try-again");

btnUp.addEventListener('click', () => {
    insertTag("U");
    queueDiv.enqueue("<div>U</div>")
    queue.enqueue("UP");
});

btnDown.addEventListener('click', () => {
    insertTag("D");
    queueDiv.enqueue("<div>D</div>")
    queue.enqueue("DOWN");
})

btnRight.addEventListener('click', () => {
    insertTag("R");
    queueDiv.enqueue("<div>R</div>")
    queue.enqueue("RIGHT");
});

btnLeft.addEventListener('click', () => {
    insertTag("L");
    queueDiv.enqueue("<div>L</div>");
    queue.enqueue("LEFT");
});

btnTryAgain.addEventListener('click', ()=>{
    tryAgain = true;
    btnTryAgain.hidden = true;
    start=false;
})

btnRemove.addEventListener('click', ()=>{
    gridMove.innerHTML = "";
    for(let i=0; i<=queue.length();i++){
        queue.dequeue();
    }
})

function insertTag(item){
    gridMove.innerHTML += `<div>${item}</div>`;
}

let start = false, tryAgain = false;
btnStart.addEventListener('click', () => {
    disableAllButtons();
    start = true;
});

function disableAllButtons(){
    
    btnDown.disabled = true;
    btnLeft.disabled = true;
    btnRight.disabled = true;
    btnUp.disabled = true;
    btnStart.disabled = true;
    btnRemove.disabled = true;
    let d = "disabled";
    btnStart.classList.add(d);
    btnDown.classList.add(d);
    btnLeft.classList.add(d);
    btnUp.classList.add(d);
    btnRight.classList.add(d);
    btnRemove.classList.add(d);
}



export {start, tryAgain, queue, queueDiv, btnTryAgain};
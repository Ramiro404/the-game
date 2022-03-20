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
var pMessage = document.getElementById("message-modal");

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
    myModal.style.visibility = 'hidden';
    
    /*btnTryAgain.hidden = true;*/
    start=false;
    enableButtons();
    window.location.reload(true)
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


function enableButtons(){
    
    btnDown.disabled = false;
    btnLeft.disabled = false;
    btnRight.disabled = false;
    btnUp.disabled = false;
    btnStart.disabled = false;
    btnRemove.disabled = false;
    let d = "disabled";
    btnStart.classList.remove(d);
    btnDown.classList.remove(d);
    btnLeft.classList.remove(d);
    btnUp.classList.remove(d);
    btnRight.classList.remove(d);
    btnRemove.classList.remove(d);
}

function showModalTryAgain(message){
    myModal.style.display = 'block';
    pMessage.innerText = message;
}

var myModal = document.getElementById('myModal')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

export {start, tryAgain, queue, queueDiv, btnTryAgain, showModalTryAgain};
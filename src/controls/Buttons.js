import Queue from "../data-structures/Queue.js";
var queue = new Queue();
var queueDiv = new Queue();
var btnUp = document.getElementById("up");
var btnDown = document.getElementById("down");
var btnRight = document.getElementById("right");
var btnLeft = document.getElementById("left");
var btnStart = document.getElementById("start");
var gridMove = document.getElementById("grid-queue");


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
    queueDiv.enqueue("<div>L</div>")
    queue.enqueue("LEFT");
})

function insertTag(item){
    gridMove.innerHTML += `<div>${item}</div>`;
}

let start = false;
btnStart.addEventListener('click', () => {
    start = true;
})

export {start, queue, queueDiv};


// if (start && !queue.isEmpty()) {
//     var move = queue.dequeue();
//     switch (move) {
//         case "UP":
//             x--;
//             boxPosition.setPosition(x, z);
//             if (!isThereCollition())
//                 box.position.set(x, 0.5, z);
//             break;
//         case "DOWN":
//             ++x;
//             boxPosition.setPosition(x, z);
//             if (!isThereCollition())
//                 box.position.set(x, 0.5, z);
//             break;
//         case "LEFT":
//             z++;
//             boxPosition.setPosition(x, z);
//             if (!isThereCollition())
//                 box.position.set(x, 0.5, z);
//             break;
//         case "RIGHT":
//             z--;
//             boxPosition.setPosition(x, z);
//             if (!isThereCollition())
//                 box.position.set(x, 0.5, z);
//             break;
//     }
//     if(queue.isEmpty()){
//         start=false;
//     }
// }
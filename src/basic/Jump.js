import roundTwoDecimals from './RoundTwoDecimals.js';

var firstJump, secondJump, cubyModel, position, target, middle, animationStarted = false, animationFinished = false;
const STEP = 0.7;

function setCubyModelForJump(model) {
    cubyModel = model;
}

function jump(position, middle, target) {
    firstJump = new TWEEN.Tween(position).to(middle, 150);
    firstJump.easing(TWEEN.Easing.Elastic.InOut);
    firstJump.onUpdate(() => {
        cubyModel.position.x = position.x;
        cubyModel.position.y = position.y;
        cubyModel.position.z = position.z;
    });
    secondJump = new TWEEN.Tween(middle).to(target, 150);
    secondJump.easing(TWEEN.Easing.Elastic.InOut);
    secondJump.onUpdate(() => {
        cubyModel.position.x = middle.x;
        cubyModel.position.y = middle.y;
        cubyModel.position.z = middle.z;
    });
    firstJump.start();
    firstJump.chain(secondJump);
}

function jumpPretty(direction) {
    if (direction == "UP") {
        moveUp();
    }
    if (direction == "DOWN") {
        moveDown();
    }
    if (direction == "RIGHT") {
        moveRight();
    }
    if (direction == "LEFT") {
        moveLeft();
    }
}

function moveUp() {
    position = cubyModel.position;
    middle = { x: cubyModel.position.x + roundTwoDecimals((STEP / 2)), y: 1, z: cubyModel.position.z };
    target = { x: cubyModel.position.x + roundTwoDecimals(STEP), y: 0.5, z: cubyModel.position.z };
    jump(position, middle, target);
}

function moveDown() {
    position = cubyModel.position;
    middle = { x: cubyModel.position.x , y: 1, z: cubyModel.position.z - roundTwoDecimals(STEP/2)};
    target = { x: cubyModel.position.x , y: 0.5, z: cubyModel.position.z - roundTwoDecimals(STEP)};
    jump(position, middle, target);
}

function moveLeft() {
    position = cubyModel.position;
    middle = { x: cubyModel.position.x , y: 1, z: cubyModel.position.z + roundTwoDecimals(STEP/2) };
    target = { x: cubyModel.position.x , y: 0.5, z: cubyModel.position.z + roundTwoDecimals(STEP)};
    jump(position, middle, target);
}

function moveRight() {
    position = cubyModel.position;
    middle = { x: cubyModel.position.x - roundTwoDecimals((STEP / 2)), y: 1, z: cubyModel.position.z };
    target = { x: cubyModel.position.x - roundTwoDecimals(STEP), y: 0.5, z: cubyModel.position.z };
    jump(position, middle, target);
}

let fallJump;
function fall(){
    position = cubyModel.position;
    target = { x: cubyModel.position.x, y: -5, z: cubyModel.position.z}
    fallJump = new TWEEN.Tween(position).to(target, 300);
    fallJump.easing(TWEEN.Easing.Elastic.InOut);
    fallJump.onUpdate(()=>{
        cubyModel.position.x = position.x;
        cubyModel.position.y = position.y;
        cubyModel.position.z = position.z;
    })
    fallJump.start();
}

export { setCubyModelForJump, jump, jumpPretty, fall };
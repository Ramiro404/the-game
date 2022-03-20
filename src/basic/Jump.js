var firstJump, secondJump, cubyModel, position, target, middle, animationStarted = false, animationFinished = false;
const STEP = 0.7;

function setCubyModelForJump(model) {
    cubyModel = model;
}

// function jump(position, target){
//     firstJump = new TWEEN.Tween(position).to({x: target.x + (STEP/2), y: target.y, z: target.z},1000);

//     firstJump.easing(TWEEN.Easing.Elastic.InOut);
//     firstJump.onUpdate(()=>{
//         cubyModel.position.x = position.x;
//         cubyModel.position.z = position.z;
//     });

//     secondJump = new TWEEN.Tween(middleTarget).to(target,1000);
//     secondJump.easing(TWEEN.Easing.Elastic.InOut);
//     secondJump.onUpdate(()=>{
//         cubyModel.position.x = middleTarget.x;
//         cubyModel.position.z = middleTarget.z;
//     });

//     firstJump.start();
//     firstJump.chain(secondJump);
// }

function jump(position, middle, target) {
    firstJump = new TWEEN.Tween(position).to(middle, 1000);
    firstJump.easing(TWEEN.Easing.Elastic.InOut);
    firstJump.onUpdate(() => {
        cubyModel.position.x = position.x;
        cubyModel.position.y = position.y;
        cubyModel.position.z = position.z;
    });

    secondJump = new TWEEN.Tween(middle).to(target, 1000);
    secondJump.easing(TWEEN.Easing.Elastic.InOut);
    secondJump.onUpdate(() => {
        cubyModel.position.x = middle.x;
        cubyModel.position.y = middle.y;
        cubyModel.position.z = middle.z;
    });

    firstJump.start();
    console.log("JUMP ", cubyModel.position);
    firstJump.chain(secondJump);


}

function jumpPretty(direction) {
    if (direction = "UP") {
        moveUp();
    }
    if (direction = "DOWN") {

    }
    if (direction = "RIGHT") {

    }
    if (direction = "LEFT") {

    }
}

function moveUp() {
    position = cubyModel.position;
    console.log("[Position] ", position);
    middle = { x: cubyModel.position.x + (STEP / 2), y: 1, z: cubyModel.position.z };
    target = { x: cubyModel.position.x + STEP, y: 0.5, z: cubyModel.position.z };
    //cubyModel.position.x += STEP;
    jump(position, middle, target);
}

export { setCubyModelForJump, jump, jumpPretty };
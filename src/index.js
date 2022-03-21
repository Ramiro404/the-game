import camera from './basic/Camera.js';
import keyListener from './basic/KeyListener.js';
import light from './basic/Light.js';
import renderer from './basic/Renderer.js';
import scene from './basic/Scene.js'
import loopMachine from './basic/LoopMachine.js';
import keyController from './controllers/KeyController.js';
import moveController from './controllers/MoveController.js';
import rotationController from './controllers/RotationController.js';
import shadowController from './controllers/ShadowController.js';
import characterController from './controllers/CharacterController.js';
import planeYard from "./models/plane-yard/PlaneYard.js";
import Cuby from './models/cuby/Cuby.js';
import bgTexture from './basic/TextureBackground.js';
import controls from './basic/CameraOrbitControl.js';
import MovementController from './controllers/MovementController.js';
import { start, queue, tryAgain, btnTryAgain, showModalTryAgain } from './controls/Buttons.js';
import Arbusto from './models/arbusto/Arbusto.js';
import rock from './models/rock/Rock.js';
import tree from './models/tree/Tree.js';
import enemy from './models/enemy/Enemy.js';
import key from './models/key/Key.js';
import calcPosition from './basic/CalculatePosition.js';
import lock from './models/lock/Lock.js';
import goal from './models/goal/Goal.js';
import { obtaclesPosition, setModel, isThereCollition, updateBeforeMoveObject, colitionObject, isOutOfMap } from './basic/Obtacles.js';
import { jump, setCubyModelForJump, jumpPretty, fall } from './basic/Jump.js';

scene.add(light);
scene.background = bgTexture;
camera.position.set(2, 3, -4);
controls.update();

planeYard.then(model => {
    scene.add(model)
    model.scale.set(1, 1, 1)
    characterController.addCharacter(model)
    characterController.addController(keyController)//#1
    characterController.addController(moveController)//#2
    characterController.addController(rotationController)//#3
    shadowController.setDirectionalLight(light.children[0])
    shadowController.setVector(new THREE.Vector3(0, 5, -5))
    characterController.addController(shadowController)//#4
    camera.lookAt(model.position)
    characterController.start()
})
let modelMove, cubyModel, tween;
let position = { x: 0, y: 0, z: 0 };
Cuby.then(model => {
    addAtributesToModel(0, 9, 0.5, null, model)
    setModel(model);
    cubyModel = model;
    position = model.position;
    setCubyModelForJump(model);
    tween = new TWEEN.Tween;
    modelMove = new MovementController(model);
    shadowController.setVector(new THREE.Vector3(0, 5, -5))
    characterController.addController(shadowController)//#4
})

Arbusto.then(model => {
    addAtributesToModel(3, 5, 0.5, "ENEMY", model);
})

rock.then(model => {
    addAtributesToModel(6, 3, 0.5, "ENEMY", model);
});

tree.then(model => {
    addAtributesToModel(4, 2, 0.5, "ENEMY", model);
})

enemy.then(model => {
    addAtributesToModel(5, 5, 0.5, "ENEMY", model);
});

lock.then(model => {
    lockModel = model;
    addAtributesToModel(0, 2, 0.6, "LOCK", model);
});

let lockModel, goalModel;
goal.then(model => {
    goalModel = model;
    addAtributesToModel(0, 2, 0.5, "GOAL", model);
})

function addAtributesToModel(numSquaresX, numSquaresZ, y, obstacleType, model) {
    let { x, z } = calcPosition(numSquaresX, numSquaresZ);
    obtaclesPosition.push({ type: obstacleType, x, z });
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, y, z);
}

let keyModel;
key.then(model => {
    keyModel = model;
    let { x, z } = calcPosition(0, 1);
    obtaclesPosition.push({ type: "KEY", x, z });
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
    model.rotation.y += 1.5708 * 3;
})

if (tryAgain) {
    scene.add(cubyModel);
    scene.add(lockModel);
    scene.add(goalModel);
    scene.add(keyModel);
}


let once = true, element;

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    if (start && once) {
        initialize();
        once = false;
    }
    renderer.render(scene, camera);
}

async function initialize() {
    if (!success) {
        while (!queue.isEmpty()) {
            //console.log("[Init] ");
            element = queue.dequeue();
            console.log("Element ", queue.elements);
            await movementOfObject();
        }
    }
    if (success) {
        showModalTryAgain("Level completed successfully.");
    }
    if (start && !success && queue.isEmpty()) {
        showModalTryAgain("You lost.");
    }
}

requestAnimationFrame(animate)

let lockRemoved = false, success = false, lost = false;
function movementOfObject() {
    if (element == "UP") {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                updateBeforeMoveObject(0.7, 0);
                if (!isThereCollition()) {
                    jumpPretty("UP");
                } else {
                    if (colitionObject.type == "KEY") {
                        removeEntity(keyModel);
                        removeEntity(lockModel);
                        lockRemoved = true;
                        jumpPretty("UP");
                    }
                    else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                        removeEntity(goalModel);
                        jumpPretty("UP");
                        success = true;
                    } else {
                        queue.empty();
                        element = "";
                        console.error("GAME OVER");
                    }
                }
                if(isOutOfMap()){
                    fall();
                }
                resolve();
            }, 310);
        })
    }
    if (element == "DOWN") {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                updateBeforeMoveObject(0, -0.7);
                if (!isThereCollition()) {
                    jumpPretty("DOWN");
                    //element = queue.dequeue();

                } else {
                    if (colitionObject.type == "KEY") {
                        jumpPretty("DOWN");
                        removeEntity(keyModel);
                        removeEntity(lockModel);
                        lockRemoved = true;
                        //element = queue.dequeue();
                    }
                    else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                        removeEntity(goalModel);
                        jumpPretty("DOWN");
                        success = true;
                    }
                    else {
                        element = "";
                        queue.empty();
                        console.error("GAME OVER");
                    }
                }
                if(isOutOfMap()){
                    fall();
                }
                resolve();
            }, 310);
        })
    }
    if (element == "LEFT") {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                updateBeforeMoveObject(0, 0.7);
                if (!isThereCollition()) {
                    jumpPretty("LEFT");
                    //element = queue.dequeue();
                } else {
                    if (colitionObject.type == "KEY") {
                        removeEntity(keyModel);
                        removeEntity(lockModel);
                        lockRemoved = true;
                        jumpPretty("LEFT");
                        //element = queue.dequeue();
                    }
                    else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                        removeEntity(goalModel);
                        jumpPretty("LEFT");
                        success = true;
                    }
                    else {
                        queue.empty();
                        element = "";
                        console.error("GAME OVER");
                    }
                }
                if(isOutOfMap()){
                    fall();
                }
                resolve();
            }, 310);
        })
    }
    if (element == "RIGHT") {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                updateBeforeMoveObject(-0.7, 0);
                if (!isThereCollition()) {
                    jumpPretty("RIGHT");
                    //element = queue.dequeue();
                } else {
                    if (colitionObject.type == "KEY") {
                        removeEntity(keyModel);
                        removeEntity(lockModel);
                        lockRemoved = true;
                        jumpPretty("RIGHT");
                        //element = queue.dequeue();
                    }
                    else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                        removeEntity(goalModel);
                        jumpPretty("RIGHT");
                        success = true;
                    } else {
                        element = "";
                        queue.empty();
                        console.error("GAME OVER");
                    }
                }

                if(isOutOfMap()){
                    fall();
                }
                resolve();
            }, 310);
        })
    }
}

function removeEntity(object) {
    scene.remove(object);
}
//loopMachine.start()
if (start) {
    initialize();
}

//keyListener.start()
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
import { obtaclesPosition, setModel, isThereCollition, updateBeforeMoveObject, colitionObject } from './basic/Obtacles.js';
import { jump, setCubyModelForJump, jumpPretty } from './basic/Jump.js';

scene.add(light);
scene.background = bgTexture;
camera.position.set(2, 3, -4);
controls.update();

planeYard.then(model => {
    scene.add(model)
    model.scale.set(1, 1, 1)
    //console.log(model);
    characterController.addCharacter(model)
    characterController.addController(keyController)//#1
    characterController.addController(moveController)//#2
    characterController.addController(rotationController)//#3
    shadowController.setDirectionalLight(light.children[0])
    shadowController.setVector(new THREE.Vector3(0, 5, -5))
    characterController.addController(shadowController)//#4
    // loopMachine.addCallback(() => {
    //     camera.lookAt(model.position)
    // })
    camera.lookAt(model.position)
    characterController.start()
})
let modelMove, cubyModel, tween;
let position = { x: 0, y: 0, z: 0 };
let target = { x: 0, y: 0, z: 0 };
Cuby.then(model => {
    addAtributesToModel(0, 9, 0.5, null, model)
    setModel(model);
    cubyModel = model;
    position = model.position;
    setCubyModelForJump(model);
    //console.log("[Position] ", position);
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
    //console.info("[Key] ", x + "  " + z);
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


let once = true, moving = false, element;
let counter = 0;

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    initialize();

    renderer.render(scene, camera);
}

function initialize() {
    if (!success) {

        movementOfObject();
    }
    if (success) {
        showModalTryAgain("Level completed successfully.");
    }
    if (start && !success && queue.isEmpty()) {
        showModalTryAgain("You lost.");
    }

}

requestAnimationFrame(animate)
/*loopMachine.addCallback(() => {
    if(!success){
        movementOfObject();
    }
    
    renderer.render(scene, camera);
    if(success){
        showModalTryAgain("Level completed successfully.");
        btnTryAgain.hidden = false;
        show win modal
    }
    if(start && !success && queue.isEmpty()){
        showModalTryAgain("You lost.");
         show try again
    }
    
});*/

let lockRemoved = false, success = false, lost = false;
function movementOfObject() {
    if (once) {
        /*btnTryAgain.hidden = true;*/
        element = queue.dequeue();
        once = false;
    }
    if (element == "UP") {
        updateBeforeMoveObject(0.7, 0);
        if (!isThereCollition()) {
            jumpPretty("UP");
            //position.x += 0.7;
            //cubyModel.position.x += 0.7;
            //let x = cubyModel.position.x + 0.35;
            //let z = cubyModel.position.z;
            //jump(cubyModel.position, {x: x, y: 1, z: z}, { x: x + 0.35, y:0, z: z });
            element = queue.dequeue();
        } else {
            if (colitionObject.type == "KEY") {
                removeEntity(keyModel);
                removeEntity(lockModel);
                lockRemoved = true;
                //cubyModel.position.x += 0.7;
                await jumpPretty("UP");
                element = queue.dequeue();
            }
            else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                removeEntity(goalModel);
                //cubyModel.position.x += 0.7;
                await jumpPretty("UP");
                success = true;
            } else {
                element = "";
                console.error("GAME OVER");
            }
        }
    }
    if (element == "RIGHT") {
        updateBeforeMoveObject(-0.7, 0);
        if (!isThereCollition()) {
            cubyModel.position.x -= 0.7;
            element = queue.dequeue();
        } else {
            if (colitionObject.type == "KEY") {
                removeEntity(keyModel);
                removeEntity(lockModel);
                lockRemoved = true;
                cubyModel.position.x -= 0.7;
                element = queue.dequeue();
            }
            else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                removeEntity(goalModel);
                cubyModel.position.x -= 0.7;
                success = true;
            } else {
                element = "";
                console.error("GAME OVER");
            }
        }
    }
    if (element == "DOWN") {
        updateBeforeMoveObject(0, -0.7);
        if (!isThereCollition()) {
            cubyModel.position.z -= 0.7;
            element = queue.dequeue();

        } else {
            if (colitionObject.type == "KEY") {
                cubyModel.position.z -= 0.7;
                removeEntity(keyModel);
                removeEntity(lockModel);
                lockRemoved = true;
                element = queue.dequeue();
            }
            else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                removeEntity(goalModel);
                cubyModel.position.z -= 0.7;
                success = true;
            }
            else {
                element = "";
                console.error("GAME OVER");
            }
        }
    }

    if (element == "LEFT") {
        updateBeforeMoveObject(0, 0.7);
        if (!isThereCollition()) {
            cubyModel.position.z += 0.7;
            element = queue.dequeue();
        } else {
            if (colitionObject.type == "KEY") {
                removeEntity(keyModel);
                removeEntity(lockModel);
                lockRemoved = true;
                cubyModel.position.z += 0.7;
                element = queue.dequeue();
            }
            else if ((colitionObject.type == "GOAL" || colitionObject.type == "LOCK") && lockRemoved) {
                removeEntity(goalModel);
                cubyModel.position.z += 0.7;
                success = true;
            }
            else {
                element = "";
                console.error("GAME OVER");
            }
        }
    }
}



function removeEntity(object) {
    scene.remove(object);
}
//loopMachine.start()
keyListener.start()
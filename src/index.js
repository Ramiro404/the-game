import camera from './basic/Camera.js';
import cube from './basic/shapes/Cube.js';
import keyCode from './basic/KeyCode.js';
import keyListener from './basic/KeyListener.js';
import light from './basic/Light.js';
import plane from './basic/shapes/Plane.js';
import renderer from './basic/Renderer.js';
import scene from './basic/Scene.js'
import loopMachine from './basic/LoopMachine.js';
import keyController from './controllers/KeyController.js';
import moveController from './controllers/MoveController.js';
import rotationController from './controllers/RotationController.js';
import shadowController from './controllers/ShadowController.js';
import animationController from './controllers/AnimationController.js';
import characterController from './controllers/CharacterController.js';
import policeCar from './models/police-car/PoliceCar.js';
import Xbot from './models/Xbot/XbotLoader.js';
import animate from './models/xbot/Animate.js';
import getXbotModel from './models/xbot/XbotTest.js';
import planeYard from "./models/plane-yard/PlaneYard.js";
import Cuby from './models/cuby/Cuby.js';
import bgTexture from './basic/TextureBackground.js';
import controls from './basic/CameraOrbitControl.js';
import grid from './basic/GridHelper.js';
import MovementController from './controllers/MovementController.js';
import { start, queue } from './controls/Buttons.js';
import Arbusto from './models/arbusto/Arbusto.js';
import rock from './models/rock/Rock.js';
import tree from './models/tree/Tree.js';
import enemy from './models/enemy/Enemy.js';
import key from './models/key/Key.js';
import calcPosition from './basic/CalculatePosition.js';
import { obtaclesPosition, setModel, isThereCollition, updateBeforeMoveObject, colitionObject } from './basic/Obtacles.js';

//scene.add( cube );
scene.add(light);
scene.background = bgTexture;

//scene.add( plane );
camera.position.set(2, 3, -4);
//camera.position.set(2,3,-4)
controls.update();
//camera.lookAt(cube.position)

planeYard.then(model => {
    scene.add(model)
    model.scale.set(1, 1, 1)
    console.log(model);
    //model.position.set(0,0,0);
    // console.log(model);
    characterController.addCharacter(model)
    characterController.addController(keyController)//#1
    characterController.addController(moveController)//#2
    characterController.addController(rotationController)//#3
    shadowController.setDirectionalLight(light.children[0])
    shadowController.setVector(new THREE.Vector3(0, 5, -5))
    characterController.addController(shadowController)//#4
    loopMachine.addCallback(() => {
        camera.lookAt(model.position)
    })
    //characterController.addController(animationController)//#5
    characterController.start()
})
let modelMove, cubyModel;
Cuby.then(model => {
    scene.add(model);
    let {x,z} = calcPosition(0,0);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
    setModel(model);
    cubyModel = model;

    modelMove = new MovementController(model);
    //+0.7
    //model.position.set(0.4,0,0.3);
    //model.position.set(0.4,0,1);
    shadowController.setVector(new THREE.Vector3(0, 5, -5))
    characterController.addController(shadowController)//#4
})

Arbusto.then(model => {
    let { x, z } = calcPosition(3, 5);
    obtaclesPosition.push({ type: "ENEMY",x, z });
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
})

rock.then(model => {
    let { x, z } = calcPosition(6, 3);
    obtaclesPosition.push({ type: "ENEMY",x, z });
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
});

tree.then(model => {
    let { x, z } = calcPosition(4, 2);
    obtaclesPosition.push({ type: "ENEMY",x, z });
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
})

enemy.then(model => {
    let { x, z } = calcPosition(5, 5);
    obtaclesPosition.push({ type: "ENEMY",x, z });
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
});

let keyModel;
key.then(model=>{
    keyModel = model;
    //console.info("[Key] ", model.rotation.y);
    
    
    let { x, z } = calcPosition(4, 5);
    obtaclesPosition.push({ type: "KEY",x, z });
    console.info("[Key] ", x + "  "+ z);
    scene.add(model);
    model.scale.set(1, 1, 1);
    model.position.set(x, 0.5, z);
    model.rotation.y += 1.5708*3;
})

let once = true, moving = false, element;

loopMachine.addCallback(() => {
    if (start) {
        if (once) {

            element = queue.dequeue();
            once = false;
        }
        if (element == "UP") {
            updateBeforeMoveObject(0.7, 0);
            if (!isThereCollition()) {
                
                cubyModel.position.x += 0.7;
                element = queue.dequeue();
            }else {
                if(colitionObject.type == "KEY"){
                    cubyModel.position.x += 0.7;
                    element = queue.dequeue();
                }
                element = "";
                console.error("GAME OVER");
            }
            
        }
        if (element == "RIGHT") {
            updateBeforeMoveObject(-0.7, 0);
            if (!isThereCollition()) {
                cubyModel.position.x -= 0.7;
            element = queue.dequeue();
            }else {
                if(colitionObject.type == "KEY"){
                    cubyModel.position.x -= 0.7;
                    element = queue.dequeue();
                }else{
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
                if(colitionObject.type == "KEY"){
                    cubyModel.position.z -= 0.7;
                    removeEntity(keyModel);
                    element = queue.dequeue();
                }
                else{
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
                if(colitionObject.type == "KEY"){
                    cubyModel.position.z += 0.7;
                    element = queue.dequeue();
                }
                else{
                    element = "";
                    console.error("GAME OVER");
                }
            }
        }
    }
    if(keyModel){
            //keyModel.rotation.y += 0.01;
    }
    
    //keyModel.rotation._y += 0.01;
    renderer.render(scene, camera);

});

async function calls() {
    if (start && once) {
        let element = queue.dequeue();
        await modelMove.moveSyncCall("UP");
    }
}

function removeEntity(object) {
    //var selectedObject = scene.getObjectByName(object.name);
    scene.remove( object );
}

loopMachine.start()
keyListener.start()


//console.log();
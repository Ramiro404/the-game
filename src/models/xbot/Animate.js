import loopMachine from "../../basic/LoopMachine.js";
import fileList from "./FileList.js";

const animate = (model) => {
    let mixer = new THREE.AnimationMixer(model);
    let clock = new THREE.Clock();
    loadAnimation().then(animation=>{
        // model.animations = [animation]
       const clip =  mixer.clipAction(animation)
       loopMachine.addCallback(()=>{
            mixer.update(clock.getDelta()) // .016
       })
       clip.play()
       
    })
}

const loadAnimation = () => {
    const loader = new THREE.FBXLoader()
    return new Promise((res, rej) => {
        loader.load(
            'src/models/xbot/animations/' + fileList[0],
            function (object) {
                res(object.animations[0])
            }
        )
    })
}

export default animate
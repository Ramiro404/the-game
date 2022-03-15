import loopMachine from "../LoopMachine.js"

class TransitionHandler {
    constructor(mesh) {
        this.mixer = new THREE.AnimationMixer(mesh)
        this.clock = new THREE.Clock()
        this.clips = mesh.animations.map(animation => {
            return this.mixer.clipAction(animation)
        })
        this.lastClip = null
    }
    run = () => {
        this.mixer.update(this.clock.getDelta())
    }
    start() { 
        loopMachine.addCallback(this.run)
    }
    stop() { 
        loopMachine.removeCallback(this.run)
    }
    action(animationId){
        if(this.lastClip == animationId) return
        if(this.lastClip == null){
            this.clips[animationId].play()
        } else {
            this.clips[animationId].reset().play()
            this.clips[this.lastClip].crossFadeTo(this.clips[animationId],.2,true) 
        }
        this.lastClip = animationId
        
    }
}

export default TransitionHandler
import TransitionHandler from "../basic/animations/TransitionHandler.js"


class AnimationController{
    constructor() {
        this.state = null
    }
    init(characterController) { 
        this.state = characterController.state
        this.trnasitionHandler = new TransitionHandler(characterController.character)
        this.trnasitionHandler.start()
    }
    tick() { 
        if (this.state.translation.y == 1){
            this.trnasitionHandler.action(2)
            // console.log('2 adelante');
        } else if (this.state.translation.y == -1){
            this.trnasitionHandler.action(1)
            // console.log('1 atras');
        } else {
            this.trnasitionHandler.action(0)
            // console.log('0 quieto');
        }
    }
}

const animationController = new AnimationController()

export default animationController
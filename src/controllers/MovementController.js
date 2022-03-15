
var position, lastMove, rotation, counter = 0, myInterval, limitCounter = 6;
class Movement {

    constructor(model) {

        this.model = model;
        //position = model.position;
        lastMove = "LEFT";
        //rotation = model.rotation;
    }

    async moveLeft() {
        counter = 0;
        const myInterval = new Promise((resolve, reject) => {
            const left = setInterval(() => {
                if (counter == 7) {
                    this.stop(left);
                    limitCounter++;
                    counter = 0;
                    resolve();
                } else {
                    this.model.position.x += 0.1;
                    console.log(counter++);
                }
            }, 300);
        });
        await myInterval.then(() => { console.log("Left") });
    }

    stop(myInterval) {
        clearInterval(myInterval);
    }


    async moveRight() {
        console.log("Before r");
        await this.moveSync("RIGHT");
        console.log("After r");
    }

    async moveSyncCall(direction) {
        let dump = await this.moveSync(direction);
    }

    moveFor(direction) {
        counter=0;
        const d = direction;
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (d) {
                    case "UP":
                        this.model.position.z += 0.01;
                        break;
                    case "RIGHT":
                        this.model.position.x -= 0.01;;
                        break;
                }
                resolve();
            }, 250);
        });

        for(let i=0;i<=70;i++){
            promise.then(() => {console.log(i)});
        }

        /*counter = 0;
        const d = direction;
        for (let i = 0; i <= 70; i++) {
            await setTimeout(() => {
                switch (d) {
                    case "UP":
                        this.model.position.z += 0.01;
                        break;
                    case "RIGHT":
                        this.model.position.x -= 0.01;;
                        break;
                }
            }, 200)
        }*/
    }

    moveSync(direction) {
        counter = 0;

        return new Promise((resolve, reject) => {
            console.log("I'm moving");
            const myInterval = setInterval(() => {
                if (counter === 7) {
                    this.stop(myInterval);
                    resolve();
                } else {
                    switch (direction) {
                        case "UP":
                            this.model.position.z += 0.1;
                            break;
                        case "RIGHT":
                            this.model.position.x -= 0.1;;
                            break;
                    }
                    counter++;
                }
            }, 550);
        });
    }

    /*
        movePretty(direction) {
            counter = 0;
            const myInterval = () => {
                const left = setInterval(() => {
                    if (counter == 7) {
                        this.stop(left);
                        counter = 0;
                    } else {
                        switch (direction) {
                            case "Up":
                                this.model.position.z += 0.1;
                                break;
                            case "Right":
                                this.model.position.x -= 0.1;;
                                break;
                        }
                        counter++;
                    }
                }, 300);
            };
            myInterval();*/
    // counter = 0;
    // const myInterval = new Promise((resolve, reject) => {
    //     const left = setInterval(() => {
    //         if (counter == 7) {
    //             this.stop(left);
    //             counter = 0;
    //             resolve();
    //         } else {
    //             switch (direction) {
    //                 case "Up":
    //                     this.model.position.z += 0.1;
    //                     break;
    //                 case "Right":
    //                     this.model.position.x -= 0.1;;
    //                     break;
    //             }
    //             counter++;
    //         }
    //     }, 300);
    // });
    // myInterval.then(() => { console.log(direction) });

    async moveUp() {
        await this.moveSync("UP");
        // counter = 0;
        // const myInterval = new Promise((resolve, reject) => {
        //     const left = setInterval(() => {
        //         if (counter == 7) {
        //             this.stop(left);
        //             limitCounter++;
        //             counter = 0;
        //             resolve();
        //         } else {
        //             this.model.position.z += 0.1;
        //             console.log(counter++);
        //         }
        //     }, 300);
        // });
        // myInterval.then(() => { console.log("Up") });
        //position.z += 7/10; 
        //this.model.position.z += 7 / 10;
    }
    async moveDown() {
        counter = 0;
        const myInterval = new Promise((resolve, reject) => {
            const left = setInterval(() => {
                if (counter == 7) {
                    this.stop(left);
                    limitCounter++;
                    counter = 0;
                    resolve();
                } else {
                    this.model.position.z -= 0.1;
                    console.log(counter++);
                }
            }, 500);
        });
        await myInterval.then(() => { console.log("Left") });
        //this.model.position.z -= 7 / 10;
    }

}

const moveModel = new Movement();

export default Movement;
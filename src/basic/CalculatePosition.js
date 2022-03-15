const initX = -3.1, initZ= 3.1, moving=0.7;

function calcPosition(numberOfSquaresX, numberOfSquaresZ){
    let x = initX + (moving * numberOfSquaresX);
    let z = initZ - (moving * numberOfSquaresZ);
    x = Math.round(x*100)/100;
    z = Math.round(z*100)/100;
    return { x,z};
}

export default calcPosition;
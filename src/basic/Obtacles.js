let position = { x:0, z:0};
let obtaclesPosition = [];
let colitionObject;
function setModel(model){
    position.x = model.position.x;
    position.z = model.position.z;
}
function isThereCollition(){
    for(let i=0; i<obtaclesPosition.length;i++){
        let obstacle = obtaclesPosition[i];
        //console.log(position.x + " , " + position.z + " [] " + obstacle.x + " , " + obstacle.z);
        if(position.x == obstacle.x && position.z== obstacle.z && obstacle.type != null){
            colitionObject = obstacle;
            console.log("[CO] ",colitionObject)
            return true;
        }
    }
    return false;
}
function updateBeforeMoveObject(x,z){
    position.x = Math.round((position.x + x)*100)/100;
    position.z = Math.round((position.z + z)*100)/100;
}

function isOutOfMap(){
    let pX = position.x;
    let pZ = position.z;
    console.log("pX " ,pX);
    console.log("pZ ", pZ);
    if(pX < -3.1 || pX > 3.2 || pZ > 3.1 || pZ < -3.2){
        return true;
    }
    return false;

}



export  {obtaclesPosition, setModel, isThereCollition, updateBeforeMoveObject, colitionObject, isOutOfMap};
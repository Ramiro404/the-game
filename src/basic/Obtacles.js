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
        if(position.x == obstacle.x && position.z== obstacle.z){
            colitionObject = obstacle;
            return true;
        }
    }
    return false;
}
function updateBeforeMoveObject(x,z){
    position.x = Math.round((position.x + x)*100)/100;
    position.z = Math.round((position.z + z)*100)/100;
}



export  {obtaclesPosition, setModel, isThereCollition, updateBeforeMoveObject, colitionObject};
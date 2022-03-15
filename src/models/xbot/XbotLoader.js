const loader = new THREE.FBXLoader()

const url = 'src/models/xbot/xbot.fbx'

const scale = .01

let Xbot = new Promise((res, rej) => {
    loader.load(
        url,
        function (object) {
            object.scale.set(scale, scale, scale)
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            object.castShadow = true;
            object.receiveShadow = true;
            res(object)
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
            console.log("An error happened", error);
            rej(error);
        }
    )
})

export default Xbot
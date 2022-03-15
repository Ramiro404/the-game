const loader = new THREE.GLTFLoader();

let Cuby = new Promise((res, rej) => {
  loader.load("src/models/cuby/Cuby.gltf",
    function (gltf) {
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
        }
      });
      res(gltf.scene);
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened", error);
      rej();
    });
});

export default Cuby;

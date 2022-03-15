//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera(
    -3.2,
    3.2,
    1.8,
    -1.8,
    0.01,
    100
);

export default camera
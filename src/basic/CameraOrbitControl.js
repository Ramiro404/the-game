import camera from './Camera.js';
import renderer from './Renderer.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js";
//import OrbitControls from '/js/OrbitControls.js';
let controls = new OrbitControls(camera, renderer.domElement);
export default controls;
import MoveController from "./controllers/moveController.js";
import Cube from "./objs/cube.js";
import Point from "./types/point.js";
import Size from "./types/size.js";
import PressedKeysManager from "./utils/pressedKeysManager.js";

class App {
    
    #onDraw
    #onUpdate
    #renderer

    /**
     * Main application class
     * @param {String} elementId - id of the element to render the scene
     */
    constructor(elementId) {
        // Set up the scene, camera, and renderer
        const sceneElem = document.querySelector(elementId);
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x777777);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sceneElem.offsetWidth, sceneElem.offsetHeight);
        sceneElem.appendChild(renderer.domElement);

        camera.position.z = 5;
        const pressedKeys = new PressedKeysManager();
        const moveStartController = new MoveController("keydown", pressedKeys);
        const moveStopController = new MoveController("keyup", pressedKeys);
        const cube = new Cube(
            new Point(0, 0, 0),
            new Size(1, 1, 1),
            { color: 0xff0000 }
        );
        cube.addController(moveStartController);
        cube.addController(moveStopController);
        cube.mount(scene);

        this.#renderer = renderer;

        this.#onDraw = () => {
            this.#renderer.render(scene, camera);
        }

        this.#onUpdate = () => {
            cube.update();
            this.#onDraw();
        }
    }

    start() {
        this.#renderer.setAnimationLoop(this.#onUpdate);
    }

    stop(){
        this.#renderer.setAnimationLoop(null);
    }
}

export default App;
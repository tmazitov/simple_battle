import Cube from "./objs/cube.js";
import Player from "./objs/player/player.js";
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
        scene.background = new THREE.Color(0x73ace6);
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sceneElem.offsetWidth, sceneElem.offsetHeight);
        sceneElem.appendChild(renderer.domElement);

        const pressedKeys = new PressedKeysManager();
        const player = new Player(new Point(0, 0, 0), pressedKeys);
        player.mount(scene)
        
        const grid = new Cube(
            new Point(0, -1, 0),
            new Size(100, 1, 100),
            { color: 0xc4ab66 }
        );
        grid.mount(scene);

        const tree = new Cube(
            new Point(10, 0, 20),
            new Size(1, 2, 1),
            { color: 0x5e3b2c }
        )
        tree.mount(scene)

        const tree1 = new Cube(
            new Point(-10, 0, 5),
            new Size(1, 2, 1),
            { color: 0x303975 }
        )
        tree1.mount(scene)

        this.#renderer = renderer;

        this.#onDraw = () => {
            this.#renderer.render(scene, player.camera.getInstance());
        }

        this.#onUpdate = () => {
            player.update();
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
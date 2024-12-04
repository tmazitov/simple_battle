import MoveController from "../../controllers/moveController.js"
import RotateController from "../../controllers/rotateController.js"
import Point from "../../types/point.js"
import Size from "../../types/size.js"
import Cube from "../cube.js"
import GameObj from "../gameObj.js"
import PlayerCamera from "./playerCamera.js"


class Player extends GameObj{

    #geometry
    #material
    #instance

    #pressedKeys
    #position
    #moveVector
    #moveSpeed = 0.1

    camera

    constructor(pos, pressedKeys) {
        super(pos, { isMovable: true })

        this.#geometry = new THREE.BoxGeometry(1,1, 1);
        this.#material = new THREE.MeshBasicMaterial({ color: 0x000000});

        // Combine geometry and material into a mesh
        this.#instance = new THREE.Mesh(this.#geometry, this.#material);

        this.addController(new MoveController('keydown', pressedKeys))
        this.addController(new MoveController('keyup', pressedKeys))
        this.addController(new RotateController('mousemove'))

        this.#pressedKeys = pressedKeys
        this.camera = new PlayerCamera(new Point(0, 0.5, -2))
        this.#position = new Point(pos.x, pos.y, pos.z)
    }

    mount(scene){
        // this.#obj.mount(scene)
        this.setupControllers()
    }

    update(){
        // this.#obj.update()
        if (this.#moveVector) {
            this.move()
        }
        this.camera.setRotation(this.#instance.rotation)
        this.camera.setPosition(this.#instance.position)
        // this.camera.lookAt(this.#obj.getPosition())
        // console.log(this.#obj.getPosition())
    }

    unmount(){
        this.removeControllers()
        // this.#obj.unmount()
    }

    /**
     * Set the move vector for the cube
     * @param {THREE.Vector3} vector - vector to move the cube
     */
    setMoveVector(vector){
        this.#moveVector = vector
    }

    move(){
        this.#instance.position.add(this.#moveVector)
    }

    getSpeed(){
        return this.#moveSpeed
    }

    getPosition(){
        return this.#instance.position
    }

    getRotation(){
        return this.#instance.rotation
    }

    setRotation({x, y, z}) {
        if (x) {
            this.#instance.rotation.x += 0.01 * x             
        } 
        if (y) {
            this.#instance.rotation.y += 0.01 * y
        }
        if (z) {
            this.#instance.rotation.z += 0.01 * z
        }
    }
}

export default Player;
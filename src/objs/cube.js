import Point from "../types/point.js"
import Size from "../types/size.js"
import GameObj from "./gameObj.js"

class CubeParams {
    color = 0x00ff00
}

class Cube extends GameObj{

    #instance
    #geometry
    #material

    #moveSpeed = 0.1
    #moveVector

    /**
     * Basis cube object
     * @param {Point} pos - initial position of the cube
     * @param {Size} size - size of the cube
     * @param {CubeParams} params - additional parameters for the cube
     */
    constructor(pos, size, params=new CubeParams()) {
        super(pos, { isMovable: true });
        this.#geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
        this.#material = new THREE.MeshBasicMaterial({ color: params.color });

        // Combine geometry and material into a mesh
        this.#instance = new THREE.Mesh(this.#geometry, this.#material);
        this.#instance.position.x = pos.x;
        this.#instance.position.y = pos.y;
        this.#instance.position.z = pos.z;
    }


    mount(scene){
        scene.add(this.#instance);
        this.setupControllers()
    }

    update(){
        console.log(`Cube position:`, this.#instance.position)
        if (this.#moveVector) {
            this.move()
        }
    }

    unmount() {
        this.removeControllers()  
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
}

export default Cube;
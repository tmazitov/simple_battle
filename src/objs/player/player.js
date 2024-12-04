import MoveController from "../../controllers/moveController.js"
import Point from "../../types/point.js"
import Size from "../../types/size.js"
import Cube from "../cube.js"
import PlayerCamera from "./playerCamera.js"


class Player {
    #obj
    #pressedKeys

    camera

    constructor(pos, pressedKeys) {

        this.#obj = new Cube(pos, new Size(1, 1, 1), { color: 0xff0000, isMovable: true })
        this.#obj.addController(new MoveController('keydown', pressedKeys))
        this.#obj.addController(new MoveController('keyup', pressedKeys))

        this.#pressedKeys = pressedKeys
        this.camera = new PlayerCamera(new Point(0, 1, -2))
    }

    mount(scene){
        this.#obj.mount(scene)
    }

    update(){
        this.#obj.update()
        this.camera.setPosition(this.#obj.getPosition())
        this.camera.lookAt(this.#obj.getPosition())
        console.log(this.#obj.getPosition())
    }

    unmount(){
        this.#obj.unmount()
    }

}

export default Player;
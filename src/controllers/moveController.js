import PressedKeysManager from "../utils/pressedKeysManager.js";
import Controller from "./controller.js";

class MoveController extends Controller{

    /** @type {PressedKeysManager} - manager for pressed keys */
    #pressedKeys

    /**
     * Controller for moving the player
     * @param {String} eventName - name of the event
     * @param {PressedKeysManager} - pressed keys manager
     */
    constructor(eventName, pressedKeys) {
        super(eventName);
        this.#pressedKeys = pressedKeys
    }

    handle(ev){
        const target = this.getTarget();
        if (!target)
            return;
        if (!target.setMoveVector || !target.getSpeed || !target.getRotation) {
            throw ErrTargetIsUnmovable
        }

        const speed = target.getSpeed()
        if (ev.type == "keyup") {
            this.#delPressedKey(ev)
        } else if (ev.type == "keydown") {
            this.#addPressedKey(ev)
        }

        const rotateY = target.getRotation().y
        const vector = this.#getResultVector(speed, rotateY)

        if (vector.length() == 0) {
            target.setMoveVector(null)
        } else {
            target.setMoveVector(vector)
        }
    }

    /**
     * Return the result vector of the movement
     * @param {Number} speed - speed of the game object
     */
    #getResultVector(speed, angle){
        const pressedKeys = [
            {name: "W",value : this.#pressedKeys.get("W"), angle : Math.PI * 0},
            {name: "A",value : this.#pressedKeys.get("A"), angle : Math.PI * 1/2},
            {name: "S",value : this.#pressedKeys.get("S"), angle : Math.PI * 1},
            {name: "D",value : this.#pressedKeys.get("D"), angle : Math.PI * 3/2},
        ]
        
        if (pressedKeys.find(key => key.value) === undefined) {
            return new THREE.Vector3(0, 0, 0)
        }

        const vector = new THREE.Vector3(0, 0, 0)

        pressedKeys.forEach((pressedKey) => {
            if (!pressedKey.value)
                return
            angle += pressedKey.angle
        })

        vector.x = Math.sin(angle) * speed * -1
        vector.z = Math.cos(angle) * speed * -1
        
        return vector
    }
    
    #addPressedKey(ev){
        switch (ev.code) {
            case "KeyW":
                this.#pressedKeys.set("W", true)
                break ;
            case "KeyA":
                this.#pressedKeys.set("A", true)
                break ;
            case "KeyS":
                this.#pressedKeys.set("S", true)
                break ;
            case "KeyD":
                this.#pressedKeys.set("D", true)
                break ;
        }
    }

    #delPressedKey(ev){
        switch (ev.code) {
            case "KeyW":
                this.#pressedKeys.del("W")
                break ;
            case "KeyA":
                this.#pressedKeys.del("A")
                break ;
            case "KeyS":
                this.#pressedKeys.del("S")
                break ;
            case "KeyD":
                this.#pressedKeys.del("D")
                break ;
        }
    }
}

export default MoveController;
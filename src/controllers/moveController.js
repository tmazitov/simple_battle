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
        if (!target.setMoveVector || !target.getSpeed) {
            throw ErrTargetIsUnmovable
        }

        const speed = target.getSpeed()
        if (ev.type == "keyup") {
            this.#delPressedKey(ev)
        } else if (ev.type == "keydown") {
            this.#addPressedKey(ev)
        }

        const vector = this.#getResultVector(speed)

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
    #getResultVector(speed){
        const vector = new THREE.Vector3(0, 0, 0)
        if (this.#pressedKeys.get("W")) {
            vector.add(new THREE.Vector3(0, 0, speed))
        }
        if (this.#pressedKeys.get("A")) {
            vector.add(new THREE.Vector3(speed, 0, 0))
        }
        if (this.#pressedKeys.get("S")) {
            vector.add(new THREE.Vector3(0, 0, -speed))
        }
        if (this.#pressedKeys.get("D")) {
            vector.add(new THREE.Vector3(-speed, 0, 0))
        }

        if (vector.x != 0 && vector.z != 0) {
            vector.divideScalar(Math.sqrt(2))
        } 

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
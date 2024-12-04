import Controller from "../controllers/controller.js";
import Point from "../types/point.js";

class GameObjParams {
    isMovable = false
}

class GameObj {
    /** @type {Controller[]} - array of the game object controllers*/
    #controllers = []
    
    /** @type {Point} - object position*/
    #pos 
    
    /** @type {GameObjParams} - additional parameters of the game object*/
    #params

    /**
     * @param {Point} pos - initial position of the game object
     */
    constructor(pos, params=new GameObjParams()) {
        this.#pos = new Point(pos.x, pos.y, pos.z)
        this.#params = params        
    }

    /**
     * Add a controller to the game object
     * @param {Controller} controller - controller to add
     */
    addController(controller){
        controller.setTarget(this);
        this.#controllers.push(controller);
    }

    /**
     * Set up all controllers of the game object
     */
    setupControllers(){
        this.#controllers.forEach(controller => {
            controller.mount(window)
        })
    }

    /**
     * Remove all controllers of the game object
     */
    removeControllers(){
        this.#controllers.forEach(controller => {
            controller.unmount(window)
        })
    }

    /**
     * Set the position of the game object
     * @param {Point} pos - new position
     */
    setPosition(pos){
        if (!this.#params.isMovable){
            return
        }
        this.#pos = pos
    }

    getPosition(){
        return this.#pos
    }
}

export default GameObj;
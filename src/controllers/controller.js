import { ErrElemNotFound } from "./errors.js"

class Controller {
    
    #eventName
    #target

    /**
     * Basic class for all controllers
     * @param {String} eventName - name of the event
     */
    constructor(eventName) {
        this.#eventName = eventName
    }

    /**
     * Handle function of the controller
     * @param {any} event - event to handle
     */
    handle(event) {
        console.log("Handling event: " + this.#eventName)
    }



    /**
     * Set up the controller
     * @param {HTMLElement} elem - element to set up the controller on
     */
    mount(elem) {
        if (!elem) {
            throw ErrElemNotFound
        }
        elem.addEventListener(this.#eventName, this.handle.bind(this))
    }

    /**
     * Remove the controller
     * @param {HTMLElement} elem - element to remove the controller from
     */
    unmount(elem) {
        if (!elem) {
            throw ErrElemNotFound
        }
        elem.removeEventListener(this.#eventName, this.handle.bind(this))
    }

    getEventName(){
        return this.#eventName
    }

    /**
     * Set the target instance that the controller is attached to
     * @param {any} target - target instance that the controller is attached to
     */
    setTarget(target){
        this.#target = target
    }

    getTarget(){
        return this.#target
    }
}

export default Controller;
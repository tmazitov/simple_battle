import Controller from "./controller.js";
import { ErrTargetIsUnrotatable } from "./errors.js";

class RotateController extends Controller {

    #lastX = null
    #lastY = null

    /**
     * Basic class for all controllers
     * @param {String} eventName - name of the event
     */
    constructor(eventName) {
        super(eventName);
    }

    handle(ev) {

        const target = this.getTarget();
        if (!target)
            return;

        if (!target.setRotation || !target.getRotation) {
            throw ErrTargetIsUnrotatable
        }

        const currentX = ev.clientX
        const currentY = ev.clientY
        if (currentX != null && currentY != null && this.#lastX != null && this.#lastY != null) {
            
            const deltaX = this.#lastX - currentX
            // const deltaY = currentY - this.#lastY

            target.setRotation({y: deltaX, })
        }
        this.#lastX = currentX
        this.#lastY = currentY
        
    }
}

export default RotateController
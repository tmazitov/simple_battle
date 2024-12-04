import Controller from "./controller.js";

class StayController extends Controller{
    /**
     * Controller for staying the player
     * @param {String} eventName - name of the event
     */
    constructor(eventName) {
        super(eventName);
        console.log(this.getEventName());
    }

    handle(ev){
        const target = this.getTarget();
        if (!target)
            return;
        if (!target.setMoveVector) {
            throw ErrTargetIsUnmovable
        }
        
        console.log({ev})

        target.setMoveVector(null)
    }
}

export default StayController;
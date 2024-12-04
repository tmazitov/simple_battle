import Controller from "./controller.js";

class MoveController extends Controller{
    /**
     * Controller for moving the player
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
        if (!target.setMoveVector || !target.getSpeed) {
            throw ErrTargetIsUnmovable
        }

        const speed = target.getSpeed()
        const vector = new THREE.Vector3(0, 0, 0)
        switch (ev.key) {
            case 'ArrowUp':
                vector.add(new THREE.Vector3(0, speed, 0));
                break;
            case 'ArrowDown':
                vector.add(new THREE.Vector3(0, -speed, 0));
                break;
            case 'ArrowLeft':
                vector.add(new THREE.Vector3(-speed, 0, 0));
                break;
            case 'ArrowRight':
                vector.add(new THREE.Vector3(speed, 0, 0));
                break;
        }

        if (vector.length() == 0) {
            target.setMoveVector(null)
        } else {
            target.setMoveVector(vector)
        }
    }
}

export default MoveController;
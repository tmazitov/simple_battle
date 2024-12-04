import Point from "../../types/point.js";

class PlayerCamera {
    #relativePos
    #instance


    constructor(relativePos=new Point(0, 0, 0)){
        this.#instance = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.#relativePos = relativePos;
    }

    setPosition(pos){
        this.#instance.position.x = pos.x + this.#relativePos.x;
        this.#instance.position.y = pos.y + this.#relativePos.y;
        this.#instance.position.z = pos.z + this.#relativePos.z;
    }

    setRotation(rotate){
        this.#instance.rotation.x = rotate.x;
        this.#instance.rotation.y = rotate.y;
        this.#instance.rotation.z = rotate.z;
        // console.log({x: this.#instance.rotation.x, y: this.#instance.rotation.y, z: this.#instance.rotation.z})
    }

    lookAt(pos){
        this.#instance.lookAt(pos);
    }

    getInstance(){
        return this.#instance;
    }

}

export default PlayerCamera;
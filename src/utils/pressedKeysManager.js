class PressedKeysManager {
    #pressedButtons = new Map();

    set(key, value) {
        this.#pressedButtons.set(key, value);
        }

    get(key) {
        return this.#pressedButtons.get(key);
    }

    del(key) {
        this.#pressedButtons.delete(key);
    }
}

export default PressedKeysManager;
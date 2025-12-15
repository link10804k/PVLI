import Character from "./character.js";

export default class Rat extends Character {
    constructor(scene) {
        super(scene, 120, 156, "rat");
    }
    stun() {
        console.log("se stunnea");

        this.isStunned = true;
        this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.isStunned = false
            }
        }) 

        this.play("ratStun", true);
    }
}
export default class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x=0, y=0, texture="cat", frame=0, speed) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);

        this.vidas = 7;
        this.speed = speed;

        this.play("darVueltas")

        this.setInteractive();

        this.on("pointerdown", (pointer)=> {
            this.vidas--; // Se le restan vidas al gato al clicar encima suya
            console.log(pointer.x, " ", pointer.y);
        })

        this.sKey = this.scene.input.keyboard.addKey('S');
        this.sKey.on("down", ()=> {
            this.play("caminar", true); // True para no empezar la animación desde 0 si ya se estaba ejecutando
            this.y += dt * this.speed/1000;
        })
        this.sKey.on("up", ()=> {
            this.play("darVueltas", true);
        })
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt); // IMPORTANTE
        console.log("miau", this.vidas);
    }
}
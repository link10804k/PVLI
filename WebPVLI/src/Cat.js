export default class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x=0, y=0, texture="cat", frame=0, speed) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);

        this.vidas = 7;
        //ui.setText("Vidas gato " + ui.index + ": " + this.vidas)
        
        this.speed = speed;

        this.play("darVueltas")

        this.setInteractive();

        this.on("pointerdown", (pointer)=> {
            this.vidas--; // Se le restan vidas al gato al clicar encima suya
            this.scene.events.emit("loseLife");
        })

        this.sKey = this.scene.input.keyboard.addKey('S');

        this.sKey.on("up", ()=> {
            this.play("darVueltas", true);
        })
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt); // IMPORTANTE
        
        if (this.sKey.isDown) {
            this.y += this.speed * dt / 1000;
            this.play("caminar", true);
        }
    }
}
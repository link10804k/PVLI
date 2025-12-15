import Character from './character.js';

export default class Penguin extends Character {
    constructor(scene, ballGroup){
        super(scene, 120, 424, 'penguin');

        this.aKey = this.scene.input.keyboard.addKey("a")
        this.dKey = this.scene.input.keyboard.addKey("d")
        this.spaceKey = this.scene.input.keyboard.addKey("space")


        this.spaceKey.on('down', ()=>{
            if(this.myBall!==null){
                this.throwBall(-1);
            }
        })


        this.scene.physics.add.overlap(this, ballGroup, (player, ball)=>{
            if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
                var getBallKeyPressed = true;
            }
            if(this.myBall==null && getBallKeyPressed){
                this.catchBall(ball);
                console.log("catch")
            }
            
        })

        this.ballGroup = ballGroup;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        let dir = 0;
        if(this.aKey.isDown){
            dir = -1
        } else if(this.dKey.isDown){
            dir = 1
        } 

        this.body.setVelocity(60*dir, 0)
        if(this.myBall!==null){
            this.myBall.x = this.x;
            this.myBall.y = this.y-8;
        }
        
    }



    stunned(){
        super.stunned();
        this.scene.loose();
    }

}
import Character from './character.js';

export default class Rata extends Character {
    constructor(scene, ballGroup){
        super(scene, 310, 156, 'rat')

        this.dir = -1;
        this.body.setVelocityX(this.dir*60)

        this.ballGroup = ballGroup;

        this.scene.physics.add.overlap(this, ballGroup, (me, ball)=>{
            if(this.myBall === null){
                this.catchBall(ball);
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        this.throwBall(1);
                    },
                    callbackScope: this
                })
            }
            
        })
    }

    stunned(){
        super.stunned();
        this.scene.victory();
    }

    changeDirection(){
        this.dir = -this.dir;
        this.body.setVelocityX(this.dir*60)
    }

}
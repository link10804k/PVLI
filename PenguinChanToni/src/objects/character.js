export default class Character extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture, 0)
        this.setOrigin(0,0)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.canMove = true;
        
        this.myBall = null;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
    }

    throwBall(dir){
        this.scene.playBalls.add(this.myBall);
        this.myBall.push(dir)
        
        this.myBall = null;
    }

    catchBall(ball){
        console.log('cogerbola')
        this.myBall = ball;
        this.ballGroup.remove(ball)
    }

    stunned(){
        if(this.stunTimer){
            this.stunTimer.elapsed = 0;
        } else {
            this.canMove = false;
            console.log("rat_stun")
            this.stunTimer = this.scene.time.addEvent({
                delay: 2000,
                callback: function(){
                    this.canMove=true;
                    console.log("noStun_rat")
                    this.stunTimer = null;
                },
                callbackScope: this
            })
        }

        
    }
    
}
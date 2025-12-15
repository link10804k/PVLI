import Rat from './objects/rat.js'
import Penguin from './objects/penguin.js'
import Ball from './objects/ball.js';

export default class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'level' });
    }
    
    init(data){

    }

    preload(){

    }

    create(){
        this.add.image(0,0, 'background').setOrigin(0,0);
        this.add.image(115, 168, 'table').setOrigin(0,0);
        this.add.image(375, 271, 'score').setOrigin(0,0);

        let rightLimit = this.add.zone(65, 168, 50, 300).setOrigin(0,0);
        let leftLimit = this.add.zone(351, 168, 50, 300).setOrigin(0,0);

        //Limites del tablero
        let limits = this.physics.add.staticGroup();
        limits.add(rightLimit);
        limits.add(leftLimit);

        //Bolas
        this.playBalls = this.physics.add.group();
        this.ratBalls = this.physics.add.group();
        this.penguinBalls = this.physics.add.group();

        //zona Rata
        let ratZone = this.add.zone(116, 148, 234, 16).setOrigin(0,0);
        this.physics.add.existing(ratZone)

       

        //zona Pinguino
        let penguinZone = this.add.zone(116, 468, 234, 16).setOrigin(0,0);
        this.physics.add.existing(penguinZone)

        for(let i = 0; i<5; i++){
            let ball = new Ball(this, 150+i*40, 156+16);
            this.ratBalls.add(ball);
        }

        for(let i = 0; i<5; i++){
            let ball = new Ball(this, 150+i*40, 424+32);
            this.penguinBalls.add(ball);
        }

        this.rat = new Rat(this, this.ratBalls)
        this.penguin = new Penguin(this, this.penguinBalls)

        //colision limites
        this.physics.add.collider(this.penguin, limits);
        this.physics.add.collider(this.rat, limits, ()=>{
            this.rat.changeDirection()
        });

        this.physics.add.overlap(this.playBalls, this.rat, ()=>
            {
                this.rat.stunned();
            })

        this.physics.add.collider(this.playBalls, this.playBalls);
        this.physics.add.collider(this.playBalls, limits);

        this.physics.add.overlap(this.playBalls, ratZone, (zone, ball)=>
            {
                ball.stopBall();
                this.playBalls.remove(ball)
                this.ratBalls.add(ball)
            })

        this.physics.add.overlap(this.playBalls, penguinZone, (zone, ball)=>
        {
            ball.stopBall();
            this.playBalls.remove(ball)
            this.penguinBalls.add(ball)
        })

    }

    update(t, dt){

    }

    victory(){

    }

    loose(){

    }
}
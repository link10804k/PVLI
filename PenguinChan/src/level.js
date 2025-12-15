import Penguin from "./penguin.js";
import Rat from "./rat.js";
import Ball from "./ball.js";

const TABLE_POS = {x: 115, y: 168};
const SCORE_POS = {x: 373, y: 271};
const TIMER_POS = {x: 256, y: 40};

const GAME_MODES = ["1P", "VS"]

const N_BALLS = 5;

export default class Level extends Phaser.Scene {
    constructor() {
        super({key: "level"});
    }

    init(data) {
        this.gameMode = GAME_MODES[data.gameMode];
    }
    preload() {

    }
    create() {
        this.add.image(0, 0, "background").setOrigin(0);
        this.add.image(TABLE_POS.x, TABLE_POS.y, "table").setOrigin(0);
        this.add.image(SCORE_POS.x, SCORE_POS.y, "score").setOrigin(0);

        // Timer
        this.timeLeft = 90;
        let timer = this.add.text(TIMER_POS.x, TIMER_POS.y, this.timeLeft, {fontSize: 20,fontFamily: "babelgam"});

        // Contador Bolas
        this.penguinBalls = this.add.text(413, 271, "5", {fontSize: 30,fontFamily: "babelgam", color: "#000000"}).setOrigin(0);
        this.ratBalls = this.add.text(383, 271, "5", {fontSize: 30,fontFamily: "babelgam", color: "#000000"}).setOrigin(0);



        // Límites del campo
        let leftWall = this.add.zone(115, 168, 50, 300).setOrigin(1, 0);
        this.physics.add.existing(leftWall, true);

        let rightWall = this.add.zone(351, 168, 50, 300).setOrigin(0, 0);
        this.physics.add.existing(rightWall, true);

        let penguinZone = this.add.zone(115, leftWall.y + leftWall.height, 351-115, 15).setOrigin(0);
        this.physics.add.existing(penguinZone);

        let ratZone = this.add.zone(115, leftWall.y, 351-115, 15).setOrigin(0, 1);
        this.physics.add.existing(ratZone);

        // Personajes
        this.penguin = new Penguin(this);
        this.rat = new Rat(this);

        // Bolas
        this.ratBallGroup = this.add.group();
        for (let i = 0; i < N_BALLS; i++) {
            this.ratBallGroup.add(new Ball(this, i*40 + 155, 176)).setOrigin(0.5);
        }
        this.penguinBallGroup = this.add.group();
        for (let i = 0; i < N_BALLS; i++) {
            this.penguinBallGroup.add(new Ball(this, i*40 + 155, 460)).setOrigin(0.5);
        }
        this.tableBallGroup = this.add.group();

        // Colisiones
        let limits = [leftWall, rightWall];
        let characters = [this.penguin, this.rat];

        this.physics.add.collider(limits, characters);

        this.physics.add.overlap(this.ratBallGroup, this.rat, (ball) => {
            this.rat.inRangeOfBall(ball);
        });
        this.physics.add.overlap(this.penguinBallGroup, this.penguin, (ball) => {
            this.penguin.inRangeOfBall(ball);
        });

        this.physics.add.overlap(this.rat, this.tableBallGroup, () => {
            this.rat.stun();
        })
        this.physics.add.overlap(this.penguin, this.tableBallGroup, () => {
            this.penguin.stun();
        })

        this.physics.add.overlap(this.tableBallGroup, penguinZone, (ball) => {
            this.tableBallGroup.remove(ball);
            this.penguinBallGroup.add(ball);
            ball.body.setVelocity(0, 0);
        })
        this.physics.add.overlap(this.tableBallGroup, ratZone, (ball) => {
            this.tableBallGroup.remove  (ball);
            this.ratBallGroup.add(ball);
            ball.body.setVelocity(0, 0);
        })
    }
    update(t, dt) {
        this.timeLeft -= dt;
        this.penguinBalls.text = this.penguinBallGroup.getChildren().length
        this.ratBalls.text = this.ratBallGroup.getChildren().length;
    }
    inTable(ball) {
        if (this.penguinBallGroup.contains(ball)) {
            this.penguinBallGroup.remove(ball);
        }
        else {
            this.ratBallGroup.remove(ball);
        }
        this.tableBallGroup.add(ball);
    }
}
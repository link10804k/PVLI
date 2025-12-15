import Player from "./player.js";
import Enemy from "./enemy.js";

export default class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'level' });
    }
    
    init(data) {

    }

    preload() {

    }

    create() {
        // Tiles
        this.map = this.make.tilemap({ 
			key: 'terrain', 
			tileWidth: 8, 
			tileHeight: 8 
		});

        const tileset = this.map.addTilesetImage('tileset', 'tileset');

        this.landLayer = this.map.createLayer('land', tileset);
        this.landLayer.setCollisionByExclusion(-1); 
		
		this.waterLayer = this.map.createLayer('water', tileset);
        this.waterLayer.setCollisionByExclusion(-1); 

        // Bordes del mundo
        this.borders = [];
        this.ceiling = this.add.rectangle(0, 0, this.game.config.width, 20, "#000", 0).setOrigin(0, 1);
        this.floor = this.add.rectangle(0, this.game.config.height, this.game.config.width, 20, "#000", 0).setOrigin(0, 0);

        this.physics.add.existing(this.ceiling, true);
        this.physics.add.existing(this.floor, true);

        this.borders.push(this.ceiling);
        this.borders.push(this.floor);

        this.leftWall = this.add.rectangle(-12, 0, 1, this.game.config.height, "#000", 0).setOrigin(1,0);
        this.rightWall = this.add.rectangle(this.game.config.width + 12, 0, 1, this.game.config.height, "#000", 0).setOrigin(0,0);

        this.physics.add.existing(this.leftWall, true);
        this.physics.add.existing(this.rightWall, true);

        // Entidades
        this.numEnemies = 0;
        this.enemies = [];
        this.enemyBalloons = [];
        this.player = new Player(this, this.game.config.width/2, this.game.config.height/2, "player", 0);

        for (let i = 0; i < 4; i++) {
            let enemy = new Enemy(this, 50 + 125*i, this.game.config.height/4, "player", 0, this.player);
            this.enemies.push(enemy);
            this.enemyBalloons.push(enemy.balloon);
            this.numEnemies++;
        }

        // Colisiones
        this.physics.add.collider(this.enemies, this.borders);
        this.physics.add.collider(this.enemyBalloons, this.borders);
        this.physics.add.collider(this.player, this.borders);
        this.physics.add.collider(this.player.balloon, this.borders);

        this.physics.add.collider(this.enemies, this.leftWall);
        this.physics.add.collider(this.enemies, this.rightWall);

        this.physics.add.overlap(this.player, this.leftWall, () => {
            this.player.x = this.rightWall.x - 12;
        });
        this.physics.add.overlap(this.player, this.rightWall, () => {
            this.player.x = this.leftWall.x + 12;
        });

        this.physics.add.collider(this.enemies, this.landLayer);
        this.physics.add.collider(this.enemies, this.waterLayer, (entity) => {
            entity.die();
        });
        this.physics.add.collider(this.player, this.landLayer);
        this.physics.add.collider(this.player, this.waterLayer, (entity) => {
            entity.die();
        });

        this.physics.add.collider(this.enemyBalloons, this.player, (balloon) => {
            balloon.explode();
        });
        this.physics.add.collider(this.player.balloon, this.enemies, (balloon) => {
            balloon.explode();
        });
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.enemyBalloons, this.enemyBalloons);

        this.physics.add.collider(this.enemies, this.player, (entity) => {
            console.log("entity: " + entity);
            if (entity.tryKill()) {
                this.numEnemies--;
                if (this.numEnemies == 0) {
                    this.time.addEvent({
                        delay: 3000,
                        callback: () => {this.victory();}
                    });
                }
            }
        })
    }

    update(t, dt) {

    }

    victory() {
        this.scene.start('end',  {hasWon: true});
    }

    defeat() {
        this.scene.start('end', {hasWon: false});
    }
}
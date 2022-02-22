import { Player } from "./player";
import { Weapon, BulletFactory } from "./weapon";
import { Starfield } from "./starfield";

window.onload = function() {    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });
    var player: Player;
    var weapon: Weapon;
    var starfield: Starfield;

    function preload () {
        game.load.image('player', 'assets/player.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('starfield', 'assets/starfield.png');
    }

    function create () {
        var tilesprite = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        starfield = new Starfield(tilesprite, 500);

        var playerSprite = game.add.sprite(400, 550, 'player');
        playerSprite.anchor.setTo(0.5);
        player = new Player(game.input, playerSprite, 150);

        var bulletFactory = new BulletFactory(game.add.group(), 30);
        weapon = new Weapon(bulletFactory, player.sprite, 0.25, 1000);

        player.loadWeapon(weapon);
        starfield.setPlayer(player.sprite);
    }

    function update() {
        var deltaSeconds = game.time.elapsedMS / 1000;
        player.update(deltaSeconds);
        weapon.update(deltaSeconds);
        starfield.update(deltaSeconds);
    }
}


export class Starfield {
    private player: Phaser.Sprite;

    constructor(private tilesprite: Phaser.TileSprite, private speed: number) {
    }

    public setPlayer(player: Phaser.Sprite): void {
        this.player = player;
    }

    public update(delta: number): void {
        if (this.player) {
            var parentRotation = this.player.rotation + Math.PI / 2;
            var velx = Math.cos(parentRotation);
            var vely = Math.sin(parentRotation);

            this.tilesprite.tilePosition.x += velx * this.speed * delta;
            this.tilesprite.tilePosition.y += vely * this.speed * delta;
        }
    }
}

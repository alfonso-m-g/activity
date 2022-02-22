import { Weapon } from "./weapon";

export class Player {
    private upKey: Phaser.Key;
    private downKey: Phaser.Key;
    private leftKey: Phaser.Key;
    private rightKey: Phaser.Key;
    private weapon: Weapon;

    constructor(private input: Phaser.Input, public sprite: Phaser.Sprite, private speed: number) {
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.input.onDown.add(this.onClickDown.bind(this));
        this.input.onUp.add(this.onClickUp.bind(this));
    }

    public loadWeapon(weapon: Weapon): void {
        this.weapon = weapon;
    }

    private onClickDown(): void {
        if (this.weapon)
            this.weapon.trigger(true);
    }

    private onClickUp(): void {
        if (this.weapon)
            this.weapon.trigger(false);
    }

    public update(delta: number): void {
        var y = 0;
        var x = 0;

        if (this.upKey.isDown)
            y--;
        if (this.downKey.isDown)
            y++;
        if (this.leftKey.isDown)
            x--;
        if (this.rightKey.isDown)
            x++;

        this.sprite.x += x * this.speed * delta;
        this.sprite.y += y * this.speed * delta;

        let angle = Math.atan2(this.input.y - this.sprite.y, this.input.x - this.sprite.x) + Math.PI / 2;
        this.sprite.rotation = angle;
    }
}

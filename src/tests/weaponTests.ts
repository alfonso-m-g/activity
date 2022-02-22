import { expect } from 'chai';
import { Weapon, BulletFactory } from '../lib/weapon';

describe('Weapon', () => {
    var subject: Weapon;
    var shotsFired: number = 0;
    // Mocked bullet factory
    var bulletFactory: BulletFactory = <BulletFactory>{
        generate: function(px, py, vx, vy, rot) {
            shotsFired++;
        }
    };
    var parent: any = { x: 0, y: 0 };

    beforeEach(() => {
        shotsFired = 0;
        subject = new Weapon(bulletFactory, parent, 0.25, 1);
    });

    it('should shoot if not in cooldown', () => {
        subject.trigger(true);
        subject.update(0.1);
        expect(shotsFired).to.equal(1);
    });

    it('should not shoot during cooldown', () => {
        subject.trigger(true);
        subject.update(0.1);
        subject.update(0.1);
        expect(shotsFired).to.equal(1);
    });

    it('should shoot after cooldown ends', () => {
        subject.trigger(true);
        subject.update(0.1);
        subject.update(0.3); // longer than timeout
        expect(shotsFired).to.equal(2);
    });

    it('should not shoot if not triggered', () => {
        subject.update(0.1);
        subject.update(0.1);
        expect(shotsFired).to.equal(0);
    });
});

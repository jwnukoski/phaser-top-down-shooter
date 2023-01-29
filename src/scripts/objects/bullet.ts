import 'phaser'
import WorldScene from '../scenes/worldScene'
import Entity from './entity'

export interface BulletInterface {
    scene:WorldScene, 
    x:number, 
    y:number, 
    shooter:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, 
    target:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite
}

export class Bullet extends Phaser.GameObjects.Image {
    #speed = 1
    #born = 0
    #direction = 0
    #xSpeed = 0
    #ySpeed = 0
    
    constructor(bulletDefinition:BulletInterface) {
        // https://phaser.io/examples/v3/view/games/top-down-shooter/topdowncombatmechanics
        super(bulletDefinition.scene, bulletDefinition.x, bulletDefinition.y, 'img-bullet')
        bulletDefinition.scene.add.existing(this)
        bulletDefinition.scene.physics.add.existing(this) // may need to remove this in favor of grouped physics for collision

        this.calcDirection(bulletDefinition)
        this.calcSpeedForXY(bulletDefinition)
        this.calcRotation(bulletDefinition)
    }

    private calcDirection(bulletDefinition:BulletInterface) {
        this.#direction = Math.atan((bulletDefinition.target.x - this.x) / (bulletDefinition.target.y - this.y))
    }

    private calcSpeedForXY(bulletDefinition:BulletInterface) {
        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (bulletDefinition.target.y >= this.y) {
            this.#xSpeed = this.#speed * Math.sin(this.#direction)
            this.#ySpeed = this.#speed * Math.cos(this.#direction)
        } else {
            this.#xSpeed = -this.#speed * Math.sin(this.#direction)
            this.#ySpeed = -this.#speed * Math.cos(this.#direction)
        }
    }

    private calcRotation(bulletDefinition:BulletInterface) {
        // Angle bullet with shooters rotation
        this.rotation = bulletDefinition.shooter.rotation
    }

    preUpdate(time:number, delta:number):void {
        this.x += this.#xSpeed * delta;
        this.y += this.#ySpeed * delta;
        this.#born += delta;

        if (this.#born > 1800) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy()
        }
    }
}
  
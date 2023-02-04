import 'phaser'
import WorldScene from '../../scenes/worldScene'
import Entity from '../entity'

export interface BulletParams {
    scene:WorldScene, 
    x:number, 
    y:number, 
    shooter:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, 
    target:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite
}

export default class Bullet extends Phaser.GameObjects.Image {
    #speed = 1
    #born = 0
    #direction = 0
    #xSpeed = 0
    #ySpeed = 0
    
    constructor(params:BulletParams) {
        // https://phaser.io/examples/v3/view/games/top-down-shooter/topdowncombatmechanics
        super(params.scene, params.x, params.y, 'img-bullet')
        params.scene.add.existing(this)
        params.scene.physics.add.existing(this) // may need to remove this in favor of grouped physics for collision

        this.calcDirection(params)
        this.calcSpeedForXY(params)
        this.calcRotation(params)
    }

    private calcDirection(params:BulletParams) {
        this.#direction = Math.atan((params.target.x - this.x) / (params.target.y - this.y))
    }

    private calcSpeedForXY(params:BulletParams) {
        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (params.target.y >= this.y) {
            this.#xSpeed = this.#speed * Math.sin(this.#direction)
            this.#ySpeed = this.#speed * Math.cos(this.#direction)
        } else {
            this.#xSpeed = -this.#speed * Math.sin(this.#direction)
            this.#ySpeed = -this.#speed * Math.cos(this.#direction)
        }
    }

    private calcRotation(params:BulletParams) {
        // Angle bullet with shooters rotation
        this.rotation = params.shooter.rotation
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
  
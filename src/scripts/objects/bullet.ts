import 'phaser'
import WorldScene from '../scenes/worldScene'
import Entity from './entity'

export default class Bullet extends Phaser.GameObjects.Image {
    #speed = 1
    #born = 0
    #direction = 0
    #xSpeed = 0
    #ySpeed = 0
    
    constructor(scene:WorldScene, x:number, y:number, shooter:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, target:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite) {
        // https://phaser.io/examples/v3/view/games/top-down-shooter/topdowncombatmechanics
        super(scene, x, y, 'img-bullet')
        scene.add.existing(this)
        scene.physics.add.existing(this) // may need to remove this in favor of grouped physics for collision

        this.#direction = Math.atan((target.x - this.x) / (target.y - this.y))

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y) {
            this.#xSpeed = this.#speed * Math.sin(this.#direction);
            this.#ySpeed = this.#speed * Math.cos(this.#direction);
        } else {
            this.#xSpeed = -this.#speed * Math.sin(this.#direction);
            this.#ySpeed = -this.#speed * Math.cos(this.#direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
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
  
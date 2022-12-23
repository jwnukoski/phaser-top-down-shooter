import 'phaser'
import Aiming from './aiming'
import Movement from './movement'
import Animations from './animations'

export default class Player extends Phaser.GameObjects.Container {
    #aiming:Aiming
    #movement:Movement
    #animations:any
    #weaponState:string = 'unarmed'

    constructor(scene:Phaser.Scene, x:number, y:number) {
      super(scene, 0, 0)
      scene.add.existing(this)

      this.#animations = new Animations(scene, x, y, this)
      this.#aiming = new Aiming(this.#animations, scene)
      this.#movement = new Movement(this, this.#animations)
    }

    preUpdate():void {
      this.constrainVelocity(this, 250)
      this.#aiming.preUpdate()
      this.#movement.preUpdate() 
      this.#animations.pickAnimation(`${this.#movement.getMotionState()}-${this.#weaponState}`)
    }

    private constrainVelocity(sprite = this.#animations, maxVelocity) {
      // Ensures sprite speed doesnt exceed maxVelocity while update is called
      if (!sprite || !sprite.body)
        return

      var angle, currVelocitySqr, vx, vy
      vx = sprite.body.velocity.x
      vy = sprite.body.velocity.y
      currVelocitySqr = vx * vx + vy * vy

      if (currVelocitySqr > maxVelocity * maxVelocity) {
          angle = Math.atan2(vy, vx);
          vx = Math.cos(angle) * maxVelocity;
          vy = Math.sin(angle) * maxVelocity;
          sprite.body.velocity.x = vx;
          sprite.body.velocity.y = vy;
      }
    }
}
  
import 'phaser'
import Aiming from './aiming'

export default class Player extends Phaser.GameObjects.Container {
    #aiming:Aiming
    #activeSprite:Phaser.GameObjects.Sprite

    constructor(scene:Phaser.Scene, x:number, y:number) {
      super(scene, x, y)
      scene.add.existing(this)

      this.#aiming = new Aiming(x, y, this, scene)
      this.add(this.#aiming)

      this.#activeSprite = scene.add.sprite(0, 0, 'img-player-idle-unarmed')
      this.add(this.#activeSprite)
    }

    preUpdate(time:number, delta:number):void {
      // Constrain velocity of player
      this.constrainVelocity(this, 250);
    }

    constrainVelocity(sprite = this, maxVelocity) {
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
  
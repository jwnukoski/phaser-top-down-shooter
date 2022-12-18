import 'phaser'
import Aiming from './aiming'

export default class Player extends Phaser.GameObjects.Container {
    #aiming:Aiming
    #activeSprite:Phaser.GameObjects.Sprite

    constructor(scene:Phaser.Scene, x:number, y:number) {
      super(scene, x, y)
      scene.add.existing(this)


      this.#aiming = new Aiming(x, y, this, scene)
      // this.add(this.#aiming) <- add this back in when math is fixed

      // this.#activeSprite = scene.add.sprite(0, 0, 'img-player-idle-unarmed').setAngle(-90)
      // this.add(this.#activeSprite)

      
      //scene.anims.create(this.#frameConfig)

      this.createAnimations()
    }

    private createAnimations() {
      const walkUnarmed = this.scene.add.sprite(0, 0, 'img-player-walk-ss-48-48-punch').setAngle(-90)
      this.add(walkUnarmed)
      
      walkUnarmed.anims.create({
        key: 'player-walk-punch',
        frameRate: 8,
        frames: this.scene.anims.generateFrameNumbers('img-player-walk-ss-48-48-punch', { start: 0, end: 8 }),
      })

      walkUnarmed.play('player-walk-punch')
    }

    preUpdate(time:number, delta:number):void {
      // Constrain velocity of player
      this.constrainVelocity(this, 250)

      // TODO: Fix math in Aiming, because the X / Y values are inherited from this container when added as a child
      this.#aiming.preUpdate(time, delta) 
    }

    private constrainVelocity(sprite = this, maxVelocity) {
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
  
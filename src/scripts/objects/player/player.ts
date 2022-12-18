import 'phaser'
import Aiming from './aiming'

export default class Player extends Phaser.GameObjects.Container {
    #aiming:Aiming
    #spritesheetKey:string = 'img-player-ss-48-48-player'
    #spritesheet:Phaser.GameObjects.Sprite 

    constructor(scene:Phaser.Scene, x:number, y:number) {
      super(scene, x, y)
      scene.add.existing(this)


      this.#aiming = new Aiming(x, y, this, scene)
      // this.add(this.#aiming) <- add this back in when math is fixed

      this.#spritesheet = this.scene.add.sprite(0, 0, this.#spritesheetKey).setAngle(-90)
      this.add(this.#spritesheet)
      this.createAnimations()
    }

    private createAnimations() {
      this.#spritesheet.anims.create(
        this.genAnimConf('idle-punch', 0, 3, -1)
      )

      this.#spritesheet.anims.create(
          this.genAnimConf('walk-unarmed', 10, 17, -1)
      )
      

      this.#spritesheet.play('walk-unarmed');
    }

    private genAnimConf(key:string, startFrame:number, endFrame:number, repeat:number, frameRate = 8):Phaser.Types.Animations.Animation {
      return {
        key: key,
        frames: this.#spritesheet.anims.generateFrameNumbers(this.#spritesheetKey, {
          start: startFrame,
          end: endFrame
        }),
        frameRate: frameRate,
        repeat: repeat
      }
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
  
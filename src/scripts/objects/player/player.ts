import 'phaser'
import Aiming from './aiming'
import Movement from './movement'

export default class Player extends Phaser.GameObjects.Container {
    #aiming:Aiming
    #movement:Movement
    #spritesheetKey:string = 'img-player-ss-48-48-player'
    #spritesheetWithPhysics:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    constructor(scene:Phaser.Scene, x:number, y:number) {
      super(scene, 0, 0)
      scene.add.existing(this)

      this.setupSpritesheet(x, y)
      this.setupAnimations()
      this.setupAiming(x, y)
      this.setupMovement()

      this.scene.physics.add.group()
    }

    private setupSpritesheet(x:number, y:number) {
      this.#spritesheetWithPhysics = this.scene.physics.add.sprite(x, y, this.#spritesheetKey)
      this.add(this.#spritesheetWithPhysics)
    }

    private setupMovement() {
      this.#movement = new Movement(this, this.#spritesheetWithPhysics)
    }

    private setupAiming(x:number, y:number) {
      this.#aiming = new Aiming(this.#spritesheetWithPhysics, this.scene)
      // this.add(this.#aiming) <- add this back in when math is fixed
    }

    private setupAnimations() {
      const anims = this.#spritesheetWithPhysics.anims

      anims.create(
        this.genAnimConf('idle-punch', 0, 3, -1)
      )

      anims.create(
        this.genAnimConf('idle-handgun', 30, 30, 0)
      )

      anims.create(
        this.genAnimConf('idle-rifle', 40, 47, 0)
      )

      anims.create(
          this.genAnimConf('walk-unarmed', 10, 17, -1)
      )
      
      anims.create(
        this.genAnimConf('walk-punch', 20, 27, -1)
      )

      anims.create(
        this.genAnimConf('walk-handgun', 30, 37, -1)
      )

      anims.create(
        this.genAnimConf('walk-rifle', 40, 47, -1)
      )

      anims.create(
        this.genAnimConf('run-unarmed', 50, 55, -1)
      )

      anims.create(
        this.genAnimConf('run-punch', 60, 65, -1)
      )

      anims.create(
        this.genAnimConf('run-handgun', 70, 75, -1)
      )

      anims.create(
        this.genAnimConf('run-rifle', 80, 87, -1)
      )

      anims.create(
        this.genAnimConf('death', 90, 97, 0)
      )

      // test
      this.#spritesheetWithPhysics.play('run-handgun');
    }

    private genAnimConf(key:string, startFrame:number, endFrame:number, repeat:number, frameRate = 8):Phaser.Types.Animations.Animation {
      return {
        key: key,
        frames: this.#spritesheetWithPhysics.anims.generateFrameNumbers(this.#spritesheetKey, {
          start: startFrame,
          end: endFrame
        }),
        frameRate: frameRate,
        repeat: repeat
      }
    }

    private pickAnimation():void {
      const motionState:string = this.#movement.getMotionState()

      switch(motionState) {
        case 'idle':
          this.playAnimIfNotAlready('idle-handgun')
        break
        
        case 'run':
          this.playAnimIfNotAlready('run-handgun')
        break

        case 'walk':
          this.playAnimIfNotAlready('walk-handgun')
        break
      }
    }

    private playAnimIfNotAlready(key:string) {
      if (this.#spritesheetWithPhysics.anims.currentAnim.key !== key)
        this.#spritesheetWithPhysics.play(key)
    }

    preUpdate(time:number, delta:number):void {
      // Constrain velocity of player
      this.constrainVelocity(this, 250)

      // TODO: Fix math in Aiming, because the X / Y values are inherited from this container when added as a child
      this.#aiming.preUpdate(time, delta)
      this.#movement.preUpdate(time, delta) 

      this.pickAnimation()
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
  
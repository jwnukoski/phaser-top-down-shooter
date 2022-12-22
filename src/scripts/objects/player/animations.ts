import 'phaser'

export default class Animations extends Phaser.GameObjects.Sprite {
    #spritesheetKey:string
    #playerContainerRef:Phaser.GameObjects.Container

    constructor(scene:Phaser.Scene, x:number, y:number, playerContainer:Phaser.GameObjects.Container, spritesheetKey:string = 'img-player-ss-48-48-player') {
        super(scene, x, y, spritesheetKey)
        scene.add.existing(this)
        this.#spritesheetKey = spritesheetKey
        this.#playerContainerRef = playerContainer

        this.scene.physics.add.sprite(x, y, spritesheetKey)
        this.#playerContainerRef.add(this)
        this.setupAnimations()
    }

    private setupAnimations() {
      this.anims.create(
        this.genAnimConf('idle-punch', 0, 3, -1)
      )

      this.anims.create(
        this.genAnimConf('idle-handgun', 30, 30, 0)
      )

      this.anims.create(
        this.genAnimConf('idle-rifle', 40, 47, 0)
      )

      this.anims.create(
          this.genAnimConf('walk-unarmed', 10, 17, -1)
      )
      
      this.anims.create(
        this.genAnimConf('walk-punch', 20, 27, -1)
      )

      this.anims.create(
        this.genAnimConf('walk-handgun', 30, 37, -1)
      )

      this.anims.create(
        this.genAnimConf('walk-rifle', 40, 47, -1)
      )

      this.anims.create(
        this.genAnimConf('run-unarmed', 50, 55, -1)
      )

      this.anims.create(
        this.genAnimConf('run-punch', 60, 65, -1)
      )

      this.anims.create(
        this.genAnimConf('run-handgun', 70, 75, -1)
      )

      this.anims.create(
        this.genAnimConf('run-rifle', 80, 87, -1)
      )

      this.anims.create(
        this.genAnimConf('death', 90, 97, 0)
      )

      // test
      this.play('run-handgun');
    }

    private genAnimConf(key:string, startFrame:number, endFrame:number, repeat:number, frameRate = 8):Phaser.Types.Animations.Animation {
      return {
        key: key,
        frames: this.anims.generateFrameNumbers(this.#spritesheetKey, {
          start: startFrame,
          end: endFrame
        }),
        frameRate: frameRate,
        repeat: repeat
      }
    }

    public playAnimIfNotAlready(key:string) {
      if (this.anims.currentAnim.key !== key)
        this.play(key)
    }
}
  
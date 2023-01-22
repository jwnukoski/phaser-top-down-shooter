import 'phaser'

export default class Animations extends Phaser.GameObjects.Sprite {
    #spritesheetKey:string
    #playerContainerRef:Phaser.GameObjects.Container

    #stepVariant:number = 1
    #lastStepFrame:number = -1

    constructor(scene:Phaser.Scene, x:number, y:number, playerContainer:Phaser.GameObjects.Container, spritesheetKey:string = 'img-player-ss-48-48-player') {
        super(scene, x, y, spritesheetKey)
        scene.add.existing(this)
        this.#spritesheetKey = spritesheetKey
        this.#playerContainerRef = playerContainer

        scene.physics.add.existing(this)
        this.#playerContainerRef.add(this)
        this.setupAnimations()
    }

    private setupAnimations() {
      this.anims.create(
        this.genAnimConf('idle-unarmed', 10, 10, 0)
      )

      this.anims.create(
        this.genAnimConf('idle-punch', 0, 3, -1)
      )

      this.anims.create(
        this.genAnimConf('idle-handgun', 30, 30, 0)
      )

      this.anims.create(
        this.genAnimConf('idle-rifle', 40, 40, 0)
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

    public pickAnimation(state:string):void {
      this.playAnimIfNotAlready(state)
      this.playFrameSounds()
    }

    private playAnimIfNotAlready(key:string) {
      if (this.anims.currentAnim.key !== key)
        this.play(key)
    }

    private advanceStepVariant() {
      if (this.#stepVariant < 4)
        this.#stepVariant++
      else
        this.#stepVariant = 1
    }

    private stepFrameSounds(animKey:string, animFrame:number) {
      let playWalk:boolean = false

      if (animKey === 'walk-unarmed' || animKey === 'walk-punch' || animKey === 'walk-handgun' || animKey === 'walk-rifle')
        playWalk = (animFrame === 3 || animFrame === 7)

      if (animKey === 'run-unarmed' || animKey === 'run-punch' || animKey === 'run-handgun')
        playWalk = (animFrame === 2 || animFrame === 5)

      if (animKey === 'run-rifle')
        playWalk = (animFrame === 2 || animFrame === 5 || animFrame === 8)

      
      if (playWalk && this.#lastStepFrame !== animFrame) {
        this.#lastStepFrame = animFrame // prevent sound from playing on same frame again
        const stepSoundKey = `snd-common-step${this.#stepVariant}`
        this.advanceStepVariant()

        if (this.#playerContainerRef.scene.sound.get(stepSoundKey)?.play()) {
          return
        } else {
          this.#playerContainerRef.scene.sound.add(stepSoundKey, {
            loop: false,
            volume: 0.5,
          }).play()
        }
      }
    }

    private playFrameSounds() {
      const animKey:string = this.anims.currentAnim.key ?? ''
      const animFrame:number = this.anims.currentFrame.index ?? -1
      this.stepFrameSounds(animKey, animFrame)
    }
}
  
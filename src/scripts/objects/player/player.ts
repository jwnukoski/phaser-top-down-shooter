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
      this.#aiming.preUpdate()
      this.#movement.preUpdate() 
      this.#animations.pickAnimation(`${this.#movement.getMotionState()}-${this.#weaponState}`)
      this.#animations.frameSounds()
    }
}
  
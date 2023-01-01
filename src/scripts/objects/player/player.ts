import 'phaser'
import Aiming from './aiming'
import Movement from './movement'
import Animations from './animations'
import Entity from '../entity'
import Bullet from '../bullet'

export default class Player extends Entity {
    #aiming:Aiming
    #movement:Movement
    #animations:any
    #weaponState:string = 'unarmed'

    constructor(scene:Phaser.Scene, x:number, y:number) {
      super(scene, 0, 0, 100, 100)

      this.#animations = new Animations(scene, x, y, this)
      this.#aiming = new Aiming(this.#animations, scene)
      this.#movement = new Movement(this, this.#animations)

      new Bullet(scene, x, y, this, this.#aiming) // test
    }

    preUpdate():void {
      this.#aiming.preUpdate()
      this.#movement.preUpdate() 
      this.#animations.pickAnimation(`${this.#movement.getMotionState()}-${this.#weaponState}`)
    }
}
  
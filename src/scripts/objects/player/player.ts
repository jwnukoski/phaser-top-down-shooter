import 'phaser'
import Aiming from './aiming'
import Movement from './movement'
import Animations from './animations'
import Entity from '../entity'
import Bullet from '../bullet'
import WorldScene from '../../scenes/worldScene'

export default class Player extends Entity {
    #aiming:Aiming
    #movement:Movement
    #animations:any
    #weaponState:string = 'unarmed'

    constructor(scene:WorldScene, x:number, y:number) {
      super(scene, 0, 0, 100, 100, true, true)

      this.#animations = new Animations(scene, x, y, this)
      this.#aiming = new Aiming(this.#animations, scene)
      this.#movement = new Movement(this, this.#animations)

    }

    public getCrosshairsSprite() {
      return this.#aiming.getCrosshairsSprite()
    }

    preUpdate():void {
      this.#aiming.preUpdate()
      this.#movement.preUpdate() 
      this.#animations.pickAnimation(`${this.#movement.getMotionState()}-${this.#weaponState}`)
    }
}
  
import 'phaser'
import Aiming from './aiming'
import Movement from './movement'
import Animations from './animations'
import Weapons from './weapons'
import Entity from '../entity'
import WorldScene from '../../scenes/worldScene'

export default class Player extends Entity {
    #aiming:Aiming
    #movement:Movement
    #animations:any
    #weapons:Weapons

    constructor(scene:WorldScene, x:number, y:number) {
      super({
        worldSceneRef: scene,
        x: 0,
        y: 0,
        health: 100,
        maxHealth: 100,
        bleeds: true,
        isPlayer: true
      })

      this.#animations = new Animations(scene, x, y, this)
      this.#aiming = new Aiming(this.#animations, scene, this)
      this.#movement = new Movement(this, this.#animations)
      this.#weapons = new Weapons(this)
    }

    public getCrosshairsSprite() {
      return this.#aiming.getCrosshairsSprite()
    }

    preUpdate():void {
      this.#aiming.preUpdate()
      this.#movement.preUpdate() 
      this.#animations.pickAnimation(`${this.#movement.getMotionState()}-${this.#weapons.getCurrentWeapon()}`)
    }
}
  
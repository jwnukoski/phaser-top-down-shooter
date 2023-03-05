import 'phaser'
import Aiming from './aiming'
import Movement from './movement'
import Animations from './animations'
import Weapons from './weapons'
import Entity from '../entity'
import WorldScene from '../../scenes/worldScene'
import Hud from './hud/hud'
import { Messages, Message } from './messages'

export default class Player extends Entity {
    #aiming:Aiming
    #movement:Movement
    #animations:any
    #weapons:Weapons
    messages:Messages
    #hud:Hud

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
      this.#hud = new Hud(scene, this)
      this.messages = new Messages()

      this.messages.addMessage({
        message: 'Objective: Eliminate all enemies',
        color: 'yellow'
      })
    }

    public getCrosshairsSprite():Phaser.GameObjects.Sprite {
      return this.#aiming.getCrosshairsSprite()
    }

    public getAmmoInfo():string {
      return this.#weapons.getAmmoInfo()
    }

    public getPosition():any {
      return {
        x: this.#animations.x,
        y: this.#animations.y
      }
    }

    preUpdate():void {
      this.#aiming.preUpdate()
      this.#movement.preUpdate() 
      this.#animations.pickAnimation(`${this.#movement.getMotionState()}-${this.#weapons.getCurrentWeapon()}`)
    }
}
  
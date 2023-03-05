import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'
import Health from './health'
import Ammo from './ammo'
import Messages from './messages'
export default class Hud extends Phaser.GameObjects.Container {
    #playerRef:Player
    #health:Health
    #ammo:Ammo
    #sceneRef:WorldScene
    #messages:Messages

    constructor(scene:WorldScene, player:Player) {
        super(scene, 0, 0)
        this.#playerRef = player
        this.#sceneRef = scene
        this.scene.add.existing(this)
        
        this.#health = new Health(player, scene)
        this.add(this.#health)

        this.#ammo = new Ammo(player, scene)
        this.add(this.#ammo)

        this.#messages = new Messages(player, scene)
        this.add(this.#messages)
    }

    preUpdate():void {
        this.setPosition(this.#sceneRef.cameras.main.worldView.x, this.#sceneRef.cameras.main.worldView.y)
        this.#health.preUpdate()
        this.#ammo.preUpdate()
        this.#messages.preUpdate()
    }
}
  
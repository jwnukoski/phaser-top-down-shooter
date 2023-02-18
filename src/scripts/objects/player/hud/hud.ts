import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'
import Health from './health'

export default class Hud extends Phaser.GameObjects.Container {
    #playerRef:Player
    #health:Health
    #sceneRef:WorldScene

    constructor(scene:WorldScene, player:Player) {
        super(scene, 0, 0)
        this.#playerRef = player
        this.#sceneRef = scene
        this.scene.add.existing(this)
        
        this.#health = new Health(player, scene)
        this.add(this.#health)
    }

    preUpdate():void {
        this.setPosition(this.#sceneRef.cameras.main.worldView.x, this.#sceneRef.cameras.main.worldView.y)
        this.#health.preUpdate()
    }
}
  
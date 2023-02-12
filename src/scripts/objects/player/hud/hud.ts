import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'
import Health from './health'

export default class Hud extends Phaser.GameObjects.Container {
    #playerRef:Player
    #health:Health

    constructor(scene:WorldScene, player:Player) {
        super(scene, 0, 0)
        this.#playerRef = player
        this.scene.add.existing(this)
        
        this.#health = new Health(scene, player)
    }

    preUpdate():void {
        
    }
}
  
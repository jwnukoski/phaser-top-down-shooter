import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'

export default class Health extends Phaser.GameObjects.Container {
    #playerRef:Player

    constructor(scene:WorldScene, player:Player) {
        super(scene, 0, 0)
        this.#playerRef = player
        this.scene.add.existing(this)

    }

    preUpdate():void {
        
    }
}
  
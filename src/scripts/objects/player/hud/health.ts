import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'

export default class Health extends Phaser.GameObjects.Container {
    #playerRef:Player
    #text:Phaser.GameObjects.Text

    constructor(scene:WorldScene, player:Player) {
        super(scene, 0, 0)
        this.#playerRef = player
        this.scene.add.existing(this)

        this.#text = scene.add.text(0, 0, '0', { 
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' 
        })
    }

    preUpdate():void {
        this.#text.setText(`${this.#playerRef.getHealth()}%`)
    }
}
  
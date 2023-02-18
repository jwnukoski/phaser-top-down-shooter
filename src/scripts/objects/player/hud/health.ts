import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'
import Hud from './hud'

export default class Health extends Phaser.GameObjects.Text {
    #playerRef:Player

    constructor(player:Player, scene:WorldScene) {
        super(scene, 0, 280, '0', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            stroke: '#000000',
            strokeThickness: 2,
        })

        this.#playerRef = player
    }

    preUpdate():void {
        this.setText(`${this.#playerRef.getHealth()}%`)
    }
}
  
import 'phaser'
import { RIGHT } from 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'
import Hud from './hud'

export default class Ammo extends Phaser.GameObjects.Text {
    #playerRef:Player

    constructor(player:Player, scene:WorldScene) {
        super(scene, 0, 280, '', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'right',
            fixedWidth: scene.cameras.main.worldView.width
        })

        this.#playerRef = player
    }

    preUpdate():void {
        this.setText(this.#playerRef.getAmmoInfo() ?? '')
    }
}
  
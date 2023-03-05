import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'

export default class Health extends Phaser.GameObjects.Text {
    #playerRef:Player
    #playerHealthLastSeen:number = 0
    
    #inFlash:boolean = false
    #flashCount: number = 0
    #flashMaxCount: number = 50

    constructor(player:Player, scene:WorldScene) {
        super(scene, 0, 280, '0', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            stroke: '#000000',
            strokeThickness: 2,
        })

        this.#playerRef = player
    }

    private setDefaultStyle() {
        this.setColor('white')
    }

    private setHurtStyle() {
        this.setColor('#ff0000')
    }

    private setHealedStyle() {
        this.setColor('#00ff00')
    }

    private flashColor(playerHealthCurrent):void {
        let changeColor:boolean = false

        if ((this.#playerHealthLastSeen !== playerHealthCurrent) && !this.#inFlash) { 
            this.#inFlash = true
        }

        if (this.#inFlash && (this.#flashCount < this.#flashMaxCount)) {
            this.#flashCount++
            changeColor = true
        }

        if (this.#inFlash && (this.#flashCount >= this.#flashMaxCount)) {
            this.#flashCount = 0
            changeColor = false
            this.setDefaultStyle()
        }

        if (changeColor && (this.#playerHealthLastSeen < playerHealthCurrent)) {
            this.setHealedStyle()
        }

        if (changeColor && (this.#playerHealthLastSeen > playerHealthCurrent)) {
            this.setHurtStyle()
        }
        
        this.#playerHealthLastSeen = playerHealthCurrent
    }

    preUpdate():void {
        const playerHealthCurrent = this.#playerRef.getHealth()
        this.setText(`${playerHealthCurrent}%`)
        this.flashColor(playerHealthCurrent)
    }
}
  
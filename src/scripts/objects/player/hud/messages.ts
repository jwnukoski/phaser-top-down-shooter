import 'phaser'
import WorldScene from '../../../scenes/worldScene'
import Player from '../player'
import { Message } from '../messages'

export default class Messages extends Phaser.GameObjects.Text {
    #playerRef:Player
    
    #message:Message|undefined

    #showingMessage:boolean = false
    #messageShowCount: number = 0
    #messageMaxCount: number = 50

    constructor(player:Player, scene:WorldScene) {
        super(scene, 0, 0, '', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center',
            fixedWidth: scene.cameras.main.worldView.width,
        })

        this.#playerRef = player
    }

    private setMaxMessageCount(message:Message):number {
        // Calculates length of time to show on screen based on letter count
        const lengthPerChar = 10
        return ( (message?.message?.length ?? 1) * lengthPerChar)
    }

    private setMessageColor(message:Message):void {
        const defaultColor:string = 'white'

        try {
            this.setColor(message.color)
        } catch (e) {
            this.setColor(defaultColor)
            console.error(`Error setting message color to ${message.color}, defaulting to ${defaultColor}: ${e}`)
        }
    }

    private getMessage():void {
        this.#message = this.#playerRef.messages.pullMessage()
        
        if (this.#message === undefined)
            return

        this.setMessageColor(this.#message)
        this.setText(this.#message.message)
        this.#messageMaxCount = this.setMaxMessageCount(this.#message)
        this.#showingMessage = true
    }

    private resetMessage() {
        this.#showingMessage = false
        this.#messageMaxCount = 0
        this.text = ''
    }

    preUpdate():void {
        if (this.#showingMessage && (this.#messageShowCount < this.#messageMaxCount)) {
            this.#messageShowCount++
        } else if (this.#showingMessage && (this.#messageShowCount >= this.#messageMaxCount)) {
            this.resetMessage()
        } else if (!this.#showingMessage) {
            this.getMessage()
        }
    }
}
  
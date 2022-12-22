import 'phaser'
import Player from './player';

export default class Movement {
    #playerRef:Player
    #physicsRef:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    #moveKeys:object = {}
    #walkSpeed = 80
    #runSpeed = 150
    #moveSpeed = this.#walkSpeed
    #motionState:string = 'idle'

    constructor(player:Player, physics:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        this.#playerRef = player
        this.#physicsRef = physics
        this.setupMoveKeys()
    }

    private setupMoveKeys() {
        const scene = this.#playerRef.scene
        this.#moveKeys = {
            w: scene.input.keyboard.addKey('W'),
            a: scene.input.keyboard.addKey('A'),
            s: scene.input.keyboard.addKey('S'),
            d: scene.input.keyboard.addKey('D'),
            shift: scene.input.keyboard.addKey('SHIFT'),
        }
    }

    private verticalMovement():boolean {
        let isMoving:boolean = false

        if (this.#moveKeys['w'].isDown) {
            isMoving = true
            this.#physicsRef.setVelocityY(-this.#moveSpeed)
        } else if (this.#moveKeys['s'].isDown) {
            isMoving = true
            this.#physicsRef.setVelocityY(this.#moveSpeed)
        } else if (this.#moveKeys['w'].isUp && this.#moveKeys['s'].isUp) {
            this.#physicsRef.setVelocityY(0)
        }

        return isMoving
    }

    private horizontalMovement():boolean {
        let isMoving:boolean = false

        if (this.#moveKeys['a'].isDown) {
            isMoving = true
            this.#physicsRef.setVelocityX(-this.#moveSpeed)
        } else if (this.#moveKeys['d'].isDown) {
            isMoving = true
            this.#physicsRef.setVelocityX(this.#moveSpeed)
        } else if (this.#moveKeys['a'].isUp && this.#moveKeys['d'].isUp) {
            this.#physicsRef.setVelocityX(0)
        }

        return isMoving
    }

    private runMovement():boolean {
        let isRunning:boolean = false

        if (this.#moveKeys['shift'].isDown) {
            isRunning = true
            this.#moveSpeed = this.#runSpeed
        } else {
            this.#moveSpeed = this.#walkSpeed
        }

        return isRunning
    }

    private setMotionState(isMovingVeritcally: boolean, isMovingHorizontally:boolean, isRunning:boolean):void {
        if (isMovingHorizontally || isMovingVeritcally) {
            if (isRunning) {
                this.#motionState = 'run'
            } else {
                this.#motionState = 'walk'
            }
        } else {
            this.#motionState = 'idle'
        }
    }

    getMotionState() {
        return this.#motionState
    }

    preUpdate(time:number, delta:number) {
        try {
            this.setMotionState(this.verticalMovement(), this.horizontalMovement(), this.runMovement())
        } catch (e) {
            console.error(e)
        }
    }
}
  
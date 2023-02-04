import 'phaser'
import WorldScene from '../scenes/worldScene'

export interface EntityParams {
    worldSceneRef: WorldScene,
    x: number,
    y: number,
    health: number,
    maxHealth: number,
    bleeds: boolean,
    isPlayer: boolean
}

export default class Entity extends Phaser.GameObjects.Container implements EntityParams {
    health:number = 100
    maxHealth:number = 100
    bleeds:boolean = true
    canShoot:boolean = false
    worldSceneRef:WorldScene
    isPlayer:boolean = false

    constructor(params:EntityParams) {
        super(params.worldSceneRef, params.x, params.y)
        
        for (const key of Object.keys(params)) {
            this[key] = params[key]
        }

        params.worldSceneRef.add.existing(this)

    }

    public damage(amount:number, bleedX:number = this.x, bleedY:number = this.y):number {
        this.health -= amount
        this.bleed(bleedX, bleedY)
        
        if (this.health < 0)
            this.health = 0

        return this.health
    }

    private bleed(x:number, y:number) {
        if (!this.bleeds)
            return
    }

    public heal(amount:number):number {
        this.health += amount

        if (this.health > this.maxHealth)
            this.health = this.maxHealth

        return this.health
    }

    public getHealth():number {
        return this.health
    }

    public resetHealth():number {
        this.health = this.maxHealth
        return this.health
    }

    public isAlive():boolean {
        if (this.health > 0)
            return true

        return false
    }
}
  
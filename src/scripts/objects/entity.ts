import 'phaser'
import Bullet from './bullet'
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

export interface ShootParams {
    target:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, 
    shooter?:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, 
    shooterX?:number, 
    shooterY?:number,
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

    public damage(amount:number, bullet:Bullet, bleedX:number = this.x, bleedY:number = this.y):number {
        this.health -= amount
        this.bleed(bleedX, bleedY)
        
        if (this.health < 0)
            this.health = 0
        
        bullet.destroy()

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

    public setCanShoot(canShoot:boolean = false):boolean {
        this.canShoot = canShoot
        return this.canShoot
    }

    public getCanShoot():boolean {
        return this.canShoot && this.isAlive()
    }

    public shoot(params:ShootParams) {
        if (!this.getCanShoot())
            return
        
        new Bullet({
            scene: this.worldSceneRef,
            target: params.target,
            shooter: params.shooter ?? this,
            x: params.shooterX ?? params?.shooter?.x ?? this.x,
            y: params.shooterY ?? params?.shooter?.y ?? this.y,
        })
        
        if (this.isPlayer) {
            // Player physics collider with rest of enemies layer and hitcallback
            // this.#worldSceneRef.physics.add.collider(this.#worldSceneRef.getEnemyBulletsPhysicsGroup(), bullet, enemyHitCallback);
        }

        if (!this.isPlayer) {
            // Enemy physics collider with player and hitcallback
        }
    }
}
  
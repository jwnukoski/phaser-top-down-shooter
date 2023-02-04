import WorldScene from "../../scenes/worldScene"
import Entity from '../entity'

export interface ShootParams {
    target:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, 
    shooter?:Entity | Phaser.GameObjects.Container | Phaser.GameObjects.Sprite, 
    shooterX?:number, 
    shooterY?:number,
}
export interface WeaponParams {
    name:string,            // friendly name of weapon
    scene:WorldScene,       // scene the weapon is in
    fireRate:number,        // time between a attack/round
    magazineSize:number,    // max rounds that can fit in a magazine
    rounds:number,          // starting rounds out of magazine
    magazineRounds:number,  // starting rounds in magazine
    isMelee:boolean,        // infinite ammo
    attackSound:string,     // sound key for attack
    reloadSound:string,     // sound key for reload
    worldImg:string         // image key for world model
}

export class Weapon implements WeaponParams {
    name:string = 'なに!?'
    scene:WorldScene
    fireRate:number = 1
    magazineSize: number = 0
    rounds:number = 0
    magazineRounds:number = 0
    isMelee:boolean = false
    attackSound:string = ''
    worldImg:string = ''
    reloadSound:string = ''
    canShoot:boolean = false

    constructor(params:WeaponParams) {
        for (const key of Object.keys(params)) {
            this[key] = params[key]
        }
    }

    private removeRounds(amount:number) {
        // TODO: This could be wrong
        if (this.rounds <= 0 || amount <= 0)
            return false

        const difference = (this.rounds - amount)
        if (difference < 0)
            amount -= Math.floor(difference)
            
        this.rounds -= amount

        if (this.rounds < 0) {
            this.rounds = 0
            return false
        }

        return true
    }

    private removeRoundFromMagazine():boolean {
        if (this.isMelee)
            return false

        if (this.rounds > 0) {
            this.magazineRounds--
            return true
        }

        return false
    }

    private playShootSound():void {
        this.scene.sound.add(this.attackSound, {
            loop: false,
            volume: 0.5,
        }).play()
    }

    private playReloadSound():void {
        this.scene.sound.add(this.reloadSound, {
            loop: false,
            volume: 0.5,
        }).play()
    }

    private playNoRoundsSound():void {

    }

    public shoot(params:ShootParams):boolean {
        // if (!this.getCanShoot())
        //     return
        
        // new Bullet({
        //     scene: this.worldSceneRef,
        //     target: params.target,
        //     shooter: params.shooter ?? this,
        //     x: params.shooterX ?? params?.shooter?.x ?? this.x,
        //     y: params.shooterY ?? params?.shooter?.y ?? this.y,
        // })
        
        // if (this.isPlayer) {
        //     // Player physics collider with rest of enemies layer and hitcallback
        //     // this.#worldSceneRef.physics.add.collider(this.#worldSceneRef.getEnemyBulletsPhysicsGroup(), bullet, enemyHitCallback);
        // }

        // if (!this.isPlayer) {
        //     // Enemy physics collider with player and hitcallback
        // }

        // const shot = this.removeRoundFromMagazine()
        
        // if (shot)
        //     this.playShootSound()
        // else
        //     this.playNoRoundsSound()

        // return shot
        return false
    }

    public reloadMagazine() {
        // TODO
        const spaceLeftInMagazine = (this.magazineSize - this.magazineRounds)
        const successful = this.removeRounds(spaceLeftInMagazine)

        if (successful) {
            // prevent shooting
            this.playReloadSound()
            // add a wait
            // allow shoot again
        }
    }

    public setCanShoot(canShoot:boolean = false):boolean {
        this.canShoot = canShoot
        return this.canShoot
    }

    public getCanShoot():boolean {
        return this.canShoot
    }
}
  
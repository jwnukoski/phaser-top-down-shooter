import 'phaser'
import Bullet from './bullet'
import WorldScene from '../scenes/worldScene'

// Base class for anything 'alive' in the game
export default class Entity extends Phaser.GameObjects.Container {
    #health:number = 100
    #maxHealth:number = 100
    #bleeds:boolean = true
    #canShoot:boolean = false
    #worldSceneRef:WorldScene
    #isPlayer:boolean = false

    constructor(scene:WorldScene, x:number = 0, y:number = 0, health:number = 100, maxHealth:number = 100, bleeds:boolean = true, isPlayer:boolean = false) {
      super(scene, x, y)
      scene.add.existing(this)
      this.#worldSceneRef = scene
      this.#health = health
      this.#maxHealth = maxHealth
      this.#bleeds = bleeds
      this.#isPlayer = isPlayer
    }

    public damage(amount:number, bullet:Bullet, bleedX:number = this.x, bleedY:number = this.y):number {
        this.#health -= amount
        this.bleed(bleedX, bleedY)
        
        if (this.#health < 0)
            this.#health = 0
        
        bullet.destroy()

        return this.#health
    }

    private bleed(x:number, y:number) {
        if (!this.#bleeds)
            return
    }

    public heal(amount:number):number {
        this.#health += amount

        if (this.#health > this.#maxHealth)
            this.#health = this.#maxHealth

        return this.#health
    }

    public getHealth():number {
        return this.#health
    }

    public resetHealth():number {
        this.#health = this.#maxHealth
        return this.#health
    }

    public isAlive():boolean {
        if (this.#health > 0)
            return true

        return false
    }

    public setCanShoot(canShoot:boolean = false):boolean {
        this.#canShoot = canShoot
        return this.#canShoot
    }

    public getCanShoot():boolean {
        return this.#canShoot && this.isAlive()
    }

    public shoot() {
        if (!this.getCanShoot())
        return
        
        console.log('shoot!')

        let bullet:Bullet

        if (this.#isPlayer) 
            bullet = this.#worldSceneRef.getPlayerBulletsPhysicsGroup().get().setActive(true).setVisible(true)
        else
            bullet = this.#worldSceneRef.getEnemyBulletsPhysicsGroup().get().setActive(true).setVisible(true)

        if (!bullet)
            return

        if (this.#isPlayer) {
            new Bullet(this.#worldSceneRef, this.x, this.y, 
                        this.#worldSceneRef.getPlayer(), 
                        this.#worldSceneRef.getPlayer().getCrosshairsSprite())
                        
            // this.#worldSceneRef.physics.add.collider(this.#worldSceneRef.getEnemyBulletsPhysicsGroup(), bullet, enemyHitCallback);
        }

        if (!this.#isPlayer) {

        }
    }
}
  
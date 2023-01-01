import 'phaser'

// Base class for anything 'alive' in the game
export default class Entity extends Phaser.GameObjects.Container {
    #health:number = 100
    #maxHealth:number = 100

    constructor(scene:Phaser.Scene, x:number, y:number, health:number, maxHealth:number) {
      super(scene, x, y)
      scene.add.existing(this)
      this.#health = health
      this.#maxHealth = maxHealth
    }

    public damage(amount:number) {
        this.#health -= amount
        
        if (this.#health < 0)
            this.#health = 0
    }

    public heal(amount:number) {
        this.#health += amount

        if (this.#health > this.#maxHealth)
            this.#health = this.#maxHealth
    }

    public getHealth() {
        return this.#health
    }

    public resetHealth() {
        this.#health = this.#maxHealth
    }

    public isAlive():boolean {
        if (this.#health > 0)
            return true

        return false
    }

    public shoot() {
        
    }
}
  
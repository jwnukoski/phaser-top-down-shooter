import Player from './player/player'

export default class Weapon {
    #name:string
    #fireRate:number
    #rounds:number
    #magazineRounds:number
    #magazineSize:number
    #utilizesRounds:boolean

    constructor(name:string, fireRate:number, magazineSize:number = 0, startingRounds:number = 0, startingMagazineRounds:number = 0, utilizesRounds:boolean = true) {
        this.#name = name
        this.#fireRate = fireRate
        this.#magazineSize = magazineSize
        this.#rounds = startingRounds
        this.#magazineRounds = startingMagazineRounds
        this.#utilizesRounds = utilizesRounds

        if (!utilizesRounds)
            this.#magazineRounds, this.#rounds, this.#magazineSize = -1
    }

    public getName():string {
        return this.#name
    }

    public getRounds():number {
        return this.#rounds
    }

    public getMagazineRounds():number {
        return this.#magazineRounds
    }

    public getUtilizesRounds():boolean {
        return this.#utilizesRounds
    }

    private removeRounds(amount:number) {
        // TODO
        if (this.#rounds <= 0 || amount <= 0)
            return false

        let remainder = (this.#rounds - amount)

        if (remainder < 0)
            

        return true
    }

    private removeRoundFromMagazine():boolean {
        if (!this.#utilizesRounds)
            return true

        if (this.#rounds > 0) {
            this.#magazineRounds--
            return true
        }

        return false
    }

    private playShootSound():void {

    }

    private playNoRoundsSound():void {

    }

    public shoot():boolean {
        const shot = this.removeRoundFromMagazine()
        
        if (shot)
            this.playShootSound()
        else
            this.playNoRoundsSound()

        return shot
    }

    public reloadMagazine() {
        // TODO
        const spaceLeftInMagazine = (this.#magazineSize - this.#magazineRounds)

    }
}
  
export interface Weapon {
    name:string,            // friendly name of weapon
    fireRate:number,        // time between a attack/round
    magazineSize:number,    // max rounds that can fit in a magazine
    rounds:number,          // starting rounds out of magazine
    magazineRounds:number,  // starting rounds in magazine
    isMelee:boolean,        // infinite ammo
}

export class BaseWeapon implements Weapon {
    name:string = '???'
    fireRate:number = 1
    magazineSize: number = 0
    rounds:number = 0
    magazineRounds:number = 0
    isMelee:boolean = false

    constructor(startingWeaponParameters:Weapon) {
        for (const key of Object.keys(startingWeaponParameters)) {
            this[key] = startingWeaponParameters[key]
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
        const spaceLeftInMagazine = (this.magazineSize - this.magazineRounds)
        const successful = this.removeRounds(spaceLeftInMagazine)
    }
}
  
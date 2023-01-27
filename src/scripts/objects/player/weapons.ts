import Player from './player'

export default class Weapons {
    #weaponState:string = 'unarmed'

    constructor(player:Player) {

    }

    public getCurrentWeapon():string {
        return this.#weaponState // temp
    }
}
  
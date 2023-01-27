import Player from './player'
import Weapon from '../weapon'

export default class Weapons {
    #weaponState:string = 'unarmed'

    constructor(player:Player) {
        
    }

    public getCurrentWeapon():string {
        return this.#weaponState // temp
    }
}
  
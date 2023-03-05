import Player from './player'

export default class Weapons {
    #weaponState:string = 'pistol'

    constructor(player:Player) {
        // this.scene.game.canvas.addEventListener('mousedown', () => {
        //     this.scene.input.mouse.requestPointerLock();
        // });
    }

    public getAmmoInfo():string {
        return `0/0`
    }

    public getCurrentWeapon():string {
        return this.#weaponState // temp
    }
}
  
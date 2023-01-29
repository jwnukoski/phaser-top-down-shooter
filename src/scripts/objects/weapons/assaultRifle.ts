import 'phaser'
import { Weapon, BaseWeapon } from './baseWeapon'

export default class AssaultRifle extends BaseWeapon {
    constructor() {
        super({
            name: 'Assault Rifle',
            fireRate: 0.1,
            magazineSize: 30,
            rounds: 30,
            magazineRounds: 30,
            isMelee: false
        })
    }
}
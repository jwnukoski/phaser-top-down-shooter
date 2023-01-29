import 'phaser'
import { Weapon } from './weapon'

export default class AssaultRifle extends Weapon {
    constructor() {
        super({
            name: 'Assault Rifle',
            fireRate: 0.1,
            magazineSize: 30,
            rounds: 30,
            magazineRounds: 30,
            isMelee: false,
            attackSound: 'snd-',
        })
    }
}
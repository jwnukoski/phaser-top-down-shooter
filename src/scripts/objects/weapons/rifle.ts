import 'phaser'
import { Weapon } from './weapon'

export default class Rifle extends Weapon {
    constructor() {
        super({
            name: 'rifle',
            worldImg: 'img-weapons-rifle',
            fireRate: 0.1,
            magazineSize: 30,
            rounds: 30,
            magazineRounds: 30,
            isMelee: false,
            attackSound: 'snd-',
            reloadSound: 'snd-',
        })
    }
}
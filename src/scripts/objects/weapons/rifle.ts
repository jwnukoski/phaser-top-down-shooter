import 'phaser'
import WorldScene from '../../scenes/worldScene'
import { Weapon } from './weapon'

export default class Rifle extends Weapon {
    constructor(scene:WorldScene) {
        super({
            name: 'rifle',
            scene: scene,
            worldImg: 'img-weapons-rifle',
            fireRate: 0.1,
            magazineSize: 30,
            rounds: 30,
            magazineRounds: 30,
            isMelee: false,
            attackSound: 'snd-weapons-rifle-attack',
            reloadSound: 'snd-weapons-rifle-reload',
        })
    }
}
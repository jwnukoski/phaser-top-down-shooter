import 'phaser'
import WorldScene from '../../scenes/worldScene'
import { Weapon } from './weapon'

export default class Pistol extends Weapon {
    constructor(scene:WorldScene) {
        super({
            name: 'pistol',
            scene: scene,
            worldImg: 'img-weapons-pistol',
            fireRate: 0.1,
            magazineSize: 30,
            rounds: 30,
            magazineRounds: 30,
            isMelee: false,
            attackSound: 'snd-weapons-pistol-attack',
            reloadSound: 'snd-weapons-pistol-reload',
        })
    }
}
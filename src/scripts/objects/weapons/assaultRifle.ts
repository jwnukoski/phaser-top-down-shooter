import 'phaser'
import BaseWeapon from './baseWeapon'

export default class AssaultRifle extends BaseWeapon {
    constructor() {
        super('assault-rifle', 0.1, 30, 30, 30, true)
    }
}
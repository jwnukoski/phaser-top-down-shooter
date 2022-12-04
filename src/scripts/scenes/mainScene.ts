import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    var mapData = this.add.tilemap('testMapJson');
    mapData.addTilesetImage('phaser-logo', 'tiles'); // phaser-logo specified in map data
    mapData.createLayer('1', 'phaser-logo')
  }

  preload() {
    this.load.tilemapTiledJSON('testMapJson', 'assets/maps/1.json')
    this.load.image('tiles', 'assets/img/phaser-logo.png');
  }

  update() {

  }

}

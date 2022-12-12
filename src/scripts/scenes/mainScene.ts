import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Player from '../objects/player/player';

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    var mapData = this.add.tilemap('testMapJson');
    // tiles are 48x48
    mapData.addTilesetImage('1', 'tiles'); // phaser-logo specified in map data
    mapData.createLayer('1', '1')
    new Player(this, 0, 0)
  }

  preload() {
    this.load.tilemapTiledJSON('testMapJson', 'assets/maps/1.json')
    this.load.image('tiles', 'assets/img/tiles.png');

    // this is super annoying you have to load this here, create a loader handler to just load everything
    this.load.image('idle-unarmed', 'assets/img/player/idle/unarmed.png')
  }

  update() {

  }

}

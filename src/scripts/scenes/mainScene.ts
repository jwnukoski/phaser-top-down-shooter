import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Player from '../objects/player/player'
import ImageLoader from '../helper/imageLoader'

export default class MainScene extends Phaser.Scene {
  #imageLoader:ImageLoader = new ImageLoader(this)

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    var mapData = this.add.tilemap('testMapJson');
    // tiles are 48x48
    mapData.addTilesetImage('1', 'assets-img-ts-tiles'); // phaser-logo specified in map data
    mapData.createLayer('1', '1')
    
    new Player(this, 24, 24)
  }

  preload() {
    this.load.tilemapTiledJSON('testMapJson', 'assets/maps/1.json')
    this.#imageLoader.preload()
  }

  update() {

  }

}

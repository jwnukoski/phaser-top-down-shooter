import Player from '../objects/player/player'
import ImageLoader from '../helpers/img/imageLoader'
import SoundLoader from '../helpers/snd/soundLoader'
import Music from '../objects/music'

export default class MainScene extends Phaser.Scene {
  #imageLoader:ImageLoader = new ImageLoader(this)
  #soundLoader:SoundLoader = new SoundLoader(this)
  #music:Music = new Music(this)
  #player: Player

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    var mapData = this.add.tilemap('testMapJson');
    // tiles are 48x48
    mapData.addTilesetImage('1', 'img-tiles'); // phaser-logo specified in map data
    mapData.createLayer('1', '1')
    
    this.#player = new Player(this, 150, 150)
    this.#music.startTrack('snd-music-atmospheric')
  }

  preload() {
    this.load.tilemapTiledJSON('testMapJson', 'assets/maps/1.json')
    this.#imageLoader.preload()
    this.#soundLoader.preload()
  }

  update() {
    
  }

}

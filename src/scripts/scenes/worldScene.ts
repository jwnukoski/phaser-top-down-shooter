import Player from '../objects/player/player'
import ImageLoader from '../helpers/img/imageLoader'
import SoundLoader from '../helpers/snd/soundLoader'
import Music from '../objects/music'
import Bullet from '../objects/bullet'
import Entity from '../objects/entity'

export default class WorldScene extends Phaser.Scene {
  #imageLoader:ImageLoader = new ImageLoader(this)
  #soundLoader:SoundLoader = new SoundLoader(this)
  #music:Music = new Music(this)
  #player: Player

  #playerBullets:Phaser.Physics.Arcade.Group
  #enemyBullets:Phaser.Physics.Arcade.Group
  #enemies:Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const mapData = this.add.tilemap('testMapJson');
    mapData.addTilesetImage('1', 'img-tiles')
    mapData.createLayer('1', '1')
    
    this.#player = new Player(this, 150, 150)
    this.#music.startTrack('snd-music-atmospheric') // test

    this.#playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true })
    this.#enemies = this.physics.add.group()
    this.#enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true })
  }

  public getPlayer():Player {
    return this.#player
  }

  public getPlayerBulletsPhysicsGroup():Phaser.Physics.Arcade.Group {
    return this.#playerBullets
  }

  public getEnemyGroup():Phaser.Physics.Arcade.Group {
    return this.#enemies
  }

  public getEnemyBulletsPhysicsGroup():Phaser.Physics.Arcade.Group {
    return this.#enemyBullets
  }

  preload() {
    this.load.tilemapTiledJSON('testMapJson', 'assets/maps/1.json')
    this.#imageLoader.preload()
    this.#soundLoader.preload()
  }

  update() {
    
  }

}

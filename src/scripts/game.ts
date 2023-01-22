import 'phaser'
import WorldScene from './scenes/worldScene'

const config:Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 300,
    height: 300
  },
  pixelArt: true,
  scene: [WorldScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  input: {
    mouse: true
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})

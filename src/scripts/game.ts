import 'phaser'
import MainScene from './scenes/mainScene'

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
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})

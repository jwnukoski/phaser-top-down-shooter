import 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'phaser-logo')
      scene.add.existing(this)
      scene.physics.add.existing(this)
  
    }

    public preload() {
        
        // this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png',
            // { frameWidth: 66, frameHeight: 60 });
        
    }

    public create () {

    }

    public update() {
    
    }
}
  
import 'phaser'

export default class Player extends Phaser.GameObjects.Container {
    #sceneRef: Phaser.Scene;

    constructor(scene: Phaser.Scene, x, y) {
      super(scene, x, y)
      this.#sceneRef = scene
      
      var sprite0 = scene.add.sprite(0, 0, 'img-player-idle-unarmed')
      this.add(sprite0)

      scene.add.existing(this)
    }

    public override update() {
      console.log('update')
      
    }

    
}
  
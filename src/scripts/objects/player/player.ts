import 'phaser'

export default class Player extends Phaser.GameObjects.Container {
    #sceneRef: Phaser.Scene;

    constructor(scene: Phaser.Scene, x, y) {
      super(scene, x, y);
      this.#sceneRef = scene;
      scene.add.existing(this);
      
      var sprite0 = this.#sceneRef.add.sprite(0, 0, 'lemming');
      this.add(sprite0);
      this.#sceneRef.load.image('lemming', 'assets/img/player/idle/unarmed.png');
    }

    public preload() {
      console.log('player preload')
    }

    public override update() {
        console.log('update')
    }
}
  
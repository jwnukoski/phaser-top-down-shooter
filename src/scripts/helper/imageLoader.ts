import 'phaser'

/* Class to auto preload and key assets */
export default class ImageLoader extends Phaser.GameObjects.Container {
    #sceneRef: Phaser.Scene;

    constructor(scene: Phaser.Scene, x, y) {
      super(scene, x, y)
      this.#sceneRef = scene
      
      var sprite0 = scene.add.sprite(0, 0, 'idle-unarmed')
      this.add(sprite0)

      scene.add.existing(this)
    }

    private getImagePaths() {
        const paths = [];

        return paths;
    }

    private getImageNames(paths) {
        const names = [...paths];

        names.map((value) => {
            return value
        })

        return names;
    }

    private mapImageNamesToPaths(imagePaths, imageNames) {
        
    }

    public loadImages() {
        const paths = this.getImagePaths()
        const names = this.getImageNames(paths)

        // for (const image in mappedImages) {

        // }
    }

    private isPrefixedAsSpritesheet(filename: string) {
        return filename.startsWith('s_')
        // this.load.spritesheet('key', 'path', {
        //     frameWidth: 48,
        //     frameHeight: 48
        //   })
    }
}
  
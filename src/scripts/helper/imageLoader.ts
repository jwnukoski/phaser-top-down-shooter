import 'phaser'
import imageList from './imageList'

/* Class to auto preload and key assets */
export default class ImageLoader {
    #sceneRef: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.#sceneRef = scene  
    }
    
    preload() {   
        for (const imagePath of imageList) {
            const key = imagePath.replaceAll('/', '-')
                            .replaceAll('_', '-')
                            .replaceAll('.png', '')
                            .toLowerCase()
            this.#sceneRef.load.image(key, imagePath)
        }
    }
}
  
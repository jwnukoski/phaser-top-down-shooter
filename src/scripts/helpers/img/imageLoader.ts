import 'phaser'
import imageList from './imageList'

/* Class to auto preload and key assets */
export default class ImageLoader {
    #sceneRef: Phaser.Scene
    #regExpForSpriteSheetDesignation = /ss_/g
    #regExpForSpriteSheetDimensions = /ss_\d*_\d*_/g

    constructor(scene: Phaser.Scene) {
        this.#sceneRef = scene  
    }
    
    preload() {   
        for (const imagePath of imageList) {
            const path = `assets/img/${imagePath}.png`
            const key = path.replaceAll('assets/', '')
                            .replaceAll('/', '-')
                            .replaceAll('_', '-')
                            .replaceAll('.png', '')
                            .toLowerCase()

            this.loadAsImageOrSprite(imagePath, path, key)
        }
    }

    private loadAsImageOrSprite(imagePath:string, path:string, key:string) {
        try {
            if (imagePath.match(this.#regExpForSpriteSheetDesignation)) {
                this.#sceneRef.load.spritesheet(key, path, this.getFrameConfig(imagePath))
            } else {
                this.#sceneRef.load.image(key, path)
            }
        } catch (e) {
            console.error(e)
        }
    }

    private getFrameConfig(imagePath:string):Phaser.Types.Loader.FileTypes.ImageFrameConfig {
        const frameConfig:Phaser.Types.Loader.FileTypes.ImageFrameConfig = {
            frameWidth: 0,
            frameHeight: 0
        }

        const dimensions = imagePath.match(this.#regExpForSpriteSheetDimensions)
                            ?.join('').replace('ss_', '').split('_')

        if (Array.isArray(dimensions) && dimensions?.length >= 2) {
            frameConfig.frameWidth = Number(dimensions[0])
            frameConfig.frameHeight = Number(dimensions[1])
        }

        if (frameConfig.frameWidth === 0 || frameConfig.frameHeight === 0) {
            console.error(`${imagePath} was parsed as having a ${frameConfig.frameWidth} frameWidth and ${frameConfig.frameHeight} frameHeight`)
        }

        console.log(frameConfig)

        return frameConfig
    }
}
  
import 'phaser'
import * as fs from 'fs'
import * as path from 'path'

/* Class to auto preload and key assets */
export default class ImageLoader extends Phaser.GameObjects.Container {
    #sceneRef: Phaser.Scene;
    #files: string[] = [];

    constructor(scene: Phaser.Scene) {
        // X and Y are only needed for super and are irrelevant
        super(scene, 0, 0)
        this.#sceneRef = scene
        
        var sprite0 = scene.add.sprite(0, 0, 'idle-unarmed')
        this.add(sprite0)

        this.#files = this.getImagePaths();

        scene.add.existing(this)
    }

    private getImagePaths():string[] {
        const files = [];
        this.getFilesRecursively('/assets/img', files);
        console.log(files)
        return files;
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

    private getFilesRecursively(directory, files) {
        const filesInDirectory = fs.readdirSync(directory);
        for (const file of filesInDirectory) {
            const absolute = path.join(directory, file);
            if (fs.statSync(absolute).isDirectory()) {
                this.getFilesRecursively(absolute, files);
            } else {
                files.push(absolute);
            }
        }
    }
}
  
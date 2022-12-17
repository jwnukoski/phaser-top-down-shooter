import 'phaser'
import soundList from './soundList'

/* Class to auto preload and key assets */
export default class SoundLoader {
    #sceneRef: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.#sceneRef = scene  
    }
    
    preload() {   
        for (const soundPath of soundList) {
            const path = `assets/snd/${soundPath}.mp3`
            const key = path.replaceAll('/', '-')
                            .replaceAll('_', '-')
                            .replaceAll('.mp3', '')
                            .toLowerCase()
            this.#sceneRef.load.audio(key, path)
        }
    }
}
  
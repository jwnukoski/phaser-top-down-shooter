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
            try {
                const path = `assets/snd/${soundPath}.mp3`
                const key = path.replaceAll('assets/', '')
                                .replaceAll('/', '-')
                                .replaceAll('_', '-')
                                .replaceAll('.mp3', '')
                                .toLowerCase()
                console.log(key)      
                this.#sceneRef.load.audio(key, path)
            } catch (e) {
                console.error(e)
            }
        }
    }
}
  
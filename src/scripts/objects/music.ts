import 'phaser'

export default class Music {
    #sceneRef:Phaser.Scene
    #lastTrackKey:string
    #trackKey:string
    #track:Phaser.Sound.BaseSound
    #soundConfig:Phaser.Types.Sound.SoundConfig = {
        loop: true,
        volume: 0.5,
    }

    constructor(scene: Phaser.Scene) {
      this.#sceneRef = scene
    }

    setVolume(level:number = 1) {
        this.#soundConfig.volume = level
    }

    startTrack(trackKey:string, soundConfig:Phaser.Types.Sound.SoundConfig = this.#soundConfig, forceRestart:boolean = false) {
        this.#trackKey = trackKey

        if (this.#track !== undefined) {
            if ((this.#trackKey === this.#lastTrackKey) && (!forceRestart)) {
                return
            } else {
                this.#track.stop()
                this.#track.destroy()
            }
        }

        this.#lastTrackKey = this.#trackKey
        this.#track = this.#sceneRef.sound.add(trackKey, soundConfig)
        this.#track.play()
    }
}
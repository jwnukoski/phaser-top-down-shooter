import 'phaser'

export default class Music {
    #sceneRef: Phaser.Scene
    #trackKey: string
    #lastTrackKey: string
    #track

    constructor(scene: Phaser.Scene) {
      this.#sceneRef = scene
    }

    setVolume(level:number = 1) {
        this.#sceneRef.sound.remove(this.#track)
        this.startNewTrack(this.#trackKey)
    }

    startNewTrack(trackKey:string) {
        this.#trackKey = trackKey

        if (this.#track !== undefined) {
            if (this.#trackKey === this.#lastTrackKey) {
                return
            } else {
                this.#track.stop()
                this.#track.destroy()
            }
        }

        this.#lastTrackKey = this.#trackKey
        this.#track = this.#sceneRef.sound.add(trackKey)
        this.#track.play()
    }

    update() {
        if (this.#track !== null && !this.#track.isPlaying) {
            // Loop
            this.#track.play()
        }
    }
}
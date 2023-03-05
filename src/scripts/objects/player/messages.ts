import 'phaser'

export interface Message {
    message:string,
    color:string,
}

export class Messages {
    #messages:Message[] = []

    constructor() {}

    public addMessage(message:Message):void {
        this.#messages.push(message)
    }

    public pullMessage():Message|undefined {
        if (this.#messages.length <= 0)
            return undefined

        return this.#messages.shift()
    }
}
  
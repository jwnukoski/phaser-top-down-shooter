import 'phaser'
import Animations from './animations'

export default class Aiming extends Phaser.GameObjects.Container {
    #crosshairsSprite:Phaser.GameObjects.Sprite
    #playerAnimations:Animations
    
    constructor(playerAnimations:Animations, scene:Phaser.Scene) {
        super(scene, 0, 0)
        this.#playerAnimations = playerAnimations

        this.#crosshairsSprite = scene.physics.add.sprite(0, 0, 'img-player-crosshairs')
        this.add(this.#crosshairsSprite)

        this.setMouseBehavior()

        this.scene.add.existing(this)
    }

    setMouseBehavior() {
        // Locks pointer on mousedown
        this.scene.game.canvas.addEventListener('mousedown', () => {
            this.scene.input.mouse.requestPointerLock();
        });

        // Exit pointer lock when Q or escape (by default) is pressed.
        this.scene.input.keyboard.on('keydown_Q', () => {
            if (this.scene.game.input.mouse.locked)
                this.scene.game.input.mouse.releasePointerLock();
        });

        // Move reticle upon locked pointer move
        this.scene.input.on('pointermove', (pointer) => {
            if (this.scene.input.mouse.locked) {
                this.#crosshairsSprite.x += pointer.movementX;
                this.#crosshairsSprite.y += pointer.movementY;
            }
        });
    }

    constrainReticle(radius) {
        const player = this.#playerAnimations
        const crosshairs = this.#crosshairsSprite
        const screenWidth = 200
        const screenHeight = 200

        // Ensures reticle does not move offscreen and dist(radius) from player
        const distX = crosshairs.x - player.x; // X distance between player & reticle
        const distY = crosshairs.y - player.y; // Y distance between player & reticle

        // Ensures reticle cannot be moved offscreen
        if (distX > screenWidth)
            crosshairs.x = player.x + screenWidth;
        else if (distX < -screenWidth)
            crosshairs.x = player.x - screenWidth;

        if (distY > screenHeight)
            crosshairs.y = player.y + screenHeight;
        else if (distY < -screenHeight)
            crosshairs.y = player.y - screenHeight;

        // Ensures reticle cannot be moved further than dist(radius) from player
        const distBetween = Phaser.Math.Distance.Between(player.x, player.y, crosshairs.x, crosshairs.y);
        if (distBetween > radius) {
            // Place reticle on perimeter of circle on line intersecting player & reticle
            var scale = distBetween / radius;

            crosshairs.x = player.x + (crosshairs.x - player.x) / scale;
            crosshairs.y = player.y + (crosshairs.y - player.y) / scale;
        }
    }

    preUpdate(time:number, delta:number):void {
        const player = this.#playerAnimations
        const crosshairs = this.#crosshairsSprite
        const scene:Phaser.Scene = this.scene
        
        try {
            // Rotates player to face towards reticle
            player.rotation = Phaser.Math.Angle.Between(player.x, player.y, crosshairs.x, crosshairs.y)
    
            // Camera follows reticle
            scene.cameras.main.startFollow(crosshairs)
    
            // Makes reticle move with player
            crosshairs.body.velocity.x  = player.body.velocity.x
            crosshairs.body.velocity.y = player.body.velocity.y
    
            // Constrain position of reticle to radius around player
            this.constrainReticle(100)
        } catch (e) {
            console.error
        }
    }
}
  
import 'phaser'
import Player from './player';

export default class Aiming extends Phaser.GameObjects.Container {
    #playerPhysicsRef:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    #crosshairsSprite:Phaser.GameObjects.Sprite

    constructor(playerPhysics:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, scene:Phaser.Scene) {
        super(scene, 0, 0)
        this.#playerPhysicsRef = playerPhysics

        this.#crosshairsSprite = scene.add.sprite(0, 0, 'img-player-crosshairs')
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
                this.x += pointer.movementX;
                this.y += pointer.movementY;
            }
        });
    }

    constrainReticle(radius) {
        const player = this.#playerPhysicsRef
        const screenWidth = 200
        const screenHeight = 200

        // Ensures reticle does not move offscreen and dist(radius) from player
        var distX = this.x - player.x; // X distance between player & reticle
        var distY = this.y - player.y; // Y distance between player & reticle

        // Ensures reticle cannot be moved offscreen
        if (distX > screenWidth)
            this.x = player.x + screenWidth;
        else if (distX < -screenWidth)
            this.x = player.x - screenWidth;

        if (distY > screenHeight)
            this.y = player.y + screenHeight;
        else if (distY < -screenHeight)
            this.y = player.y - screenHeight;

        // Ensures reticle cannot be moved further than dist(radius) from player
        var distBetween = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        if (distBetween > radius) {
            // Place reticle on perimeter of circle on line intersecting player & reticle
            var scale = distBetween / radius;

            this.x = player.x + (this.x - player.x) / scale;
            this.y = player.y + (this.y - player.y) / scale;
        }
    }

    preUpdate(time:number, delta:number):void {
        const player = this.#playerPhysicsRef
        const scene:Phaser.Scene = this.scene
        
        // Rotates player to face towards reticle
        player.rotation = (-90) + Phaser.Math.Angle.Between(player.x, player.y, this.x, this.y)

        // Camera follows reticle
        scene.cameras.main.startFollow(this)

        // Makes reticle move with player
        // console.log(player)
        // this.body.velocity.x  = player.body.velocity.x ?? 0
        // this.body.velocity.y = player.body.velocity.y ?? 0

        // Constrain position of reticle to radius around player
        this.constrainReticle(100)
    }
}
  
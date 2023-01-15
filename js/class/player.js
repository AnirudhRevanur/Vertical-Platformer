class Player extends Sprite{
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5 }){
        super({ imageSrc, frameRate, scale })
        this.position = position,
        this.velocity = {
            x: 0,
            y: 1,
        },

        this.collisionBlocks = collisionBlocks

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }
    }

    update() {
        this.updateFrames()
        c.fillStyle = 'rgba(0,255,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        this.draw()
        
        this.position.x = this.position.x + this.velocity.x
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.checkForVerticalCollisions()
    }

    checkForHorizontalCollisions() {
        for(let i=0; i<this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(collision({object1: this, object2: collisionBlock})){
                if(this.velocity.x > 0){
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }

                if(this.velocity.x < 0){
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.position.y = this.position.y + this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollisions() {
        for(let i=0; i<this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(collision({object1: this, object2: collisionBlock})){
                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }

                if(this.velocity.y < 0){
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + this.height + 0.01
                    break
                }
            }
        }
    }
}
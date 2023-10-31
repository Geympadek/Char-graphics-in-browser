class SmoothMovement
{
    maxSpeed;
    squaredSpeed = 0;
    acceleration;
    deceleration;
    
    constructor(maxSpeed, acceleration, deceleration)
    {
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
    }

    increase()
    {
        if (this.squaredSpeed < this.maxSpeed * this.maxSpeed)
        {
            this.squaredSpeed += this.acceleration * deltaTime;
        }
    }
    decrease()
    {
        if (this.squaredSpeed > 0)
        {
            this.squaredSpeed -= this.deceleration * deltaTime;
        }
    }
    getCurrentSpeed()
    {
        if (this.squaredSpeed <= 0)
        {
            return 0;
        }
        return Math.sqrt(this.squaredSpeed);
    }
}

class Rocket extends GameObject
{
    forwardMovement;
    backwardsMovement;
    rotationSpeed;

    constructor(collider, sprite)
    {
        super(collider, sprite);
    }
    
    update()
    {
        player.input.up ? this.forwardMovement.increase() : this.forwardMovement.decrease();
        let forwardSpeed = this.forwardMovement.getCurrentSpeed() * deltaTime;

        this.position.x += Math.cos((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
        this.position.y += Math.sin((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;

        player.input.down ? this.backwardsMovement.increase() : this.backwardsMovement.decrease();
        let backwardsSpeed = this.backwardsMovement.getCurrentSpeed() * deltaTime;

        this.position.x -= Math.cos((this.rotation) * DEG_TO_RADIANS) * backwardsSpeed;
        this.position.y -= Math.sin((this.rotation) * DEG_TO_RADIANS) * backwardsSpeed;

        if (player.input.right)
        {
            this.rotation += this.rotationSpeed * deltaTime;
        }
        if (player.input.left)
        {
            this.rotation -= this.rotationSpeed * deltaTime;
        }
    }
    onCollision(e)
    {
        console.log("collision detected with rocket");
    }
}
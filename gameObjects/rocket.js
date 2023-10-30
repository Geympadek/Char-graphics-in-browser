class Rocket extends GameObject
{
    constructor(collider, sprite)
    {
        super(collider, sprite);
    }
    onCollision(e)
    {
        console.log("collision detected with rocket");
    }
}
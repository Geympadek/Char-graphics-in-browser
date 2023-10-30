class Projectile extends GameObject
{
    xSpeed;
    ySpeed;

    constructor(collider, sprite)
    {
        super(collider, sprite);
    }

    move()
    {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
    }
    onCollision(e)
    {
        console.log("jump!");
        if (e.collision == "top" || e.collision == "bottom")
        {
            this.ySpeed *= -1;

            if (this.xSpeed > 0)
            {
                this.rotation -= 30;
            }
            else
            {
                this.rotation += 30;
            }
        }
        if (e.collision == "left" || e.collision == "right")
        {
            this.xSpeed *= -1;

            if (this.ySpeed > 0)
            {
                this.rotation -= 30;
            }
            else
            {
                this.rotation += 30;
            }
        }

        let sourcePosition = this.getRealCollider().getGlobalPosition();
        let collidedPosition = e.gameObject.getRealCollider().getGlobalPosition();
        switch(e.collision)
        {
            case "right":
                this.position.x += collidedPosition.end.x - sourcePosition.start.x;
                break;
            case "left":
                this.position.x -= sourcePosition.end.x - collidedPosition.start.x;
                break;
            case "top":
                this.position.y -= sourcePosition.end.y - collidedPosition.start.y;
                break;
            case "bottom":
                this.position.y += collidedPosition.end.y - sourcePosition.start.y;
                break;
        }
    }
}
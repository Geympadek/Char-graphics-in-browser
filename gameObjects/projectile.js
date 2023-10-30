class Projectile extends GameObject
{
    xSpeed;
    ySpeed;

    constructor(collider, sprite)
    {
        super(collider, sprite);
    }

    update()
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
    static instanciate(original)
    {
        let instance = new Projectile(
            new Collider(original.collider.vertices, original.collider.position, original.collider.scale),
            new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation)
        );
        instance.position = Object.create(original.position);
        instance.scale = original.scale;
        instance.rotation = original.rotation;

        instance.xSpeed = original.xSpeed;
        instance.ySpeed = original.ySpeed;

        return instance;
    }
}
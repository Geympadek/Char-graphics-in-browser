class Border extends GameObject
{
    constructor(collider : Collider, sprite : Sprite)
    {
        super(collider, sprite);
    }
    onCollision<T extends GameObject>(e : {collision: string, gameObject: T})
    {
        let sourcePosition = this.getRealCollider().getGlobalPosition();
        let collidedPosition = e.gameObject.getRealCollider().getGlobalPosition();
        switch(e.collision)
        {
            case "right":
                e.gameObject.position.x -= collidedPosition.end.x - sourcePosition.start.x;
                break;
            case "left":
                e.gameObject.position.x += sourcePosition.end.x - collidedPosition.start.x;
                break;
            case "top":
                e.gameObject.position.y += sourcePosition.end.y - collidedPosition.start.y;
                break;
            case "bottom":
                e.gameObject.position.y -= collidedPosition.end.y - sourcePosition.start.y;
                break;
        }
    }
}
class GameObject
{
    layer : string;
    tag : string;

    position : {x: number, y: number};
    scale : number;
    rotation : number;

    collider : Collider;
    sprite : Sprite;

    isActive : boolean;//if false, gameObject will be deleted.

    onCollision(e : {collision: string, gameObject: GameObject}) : void
    {

    }

    constructor(collider : Collider, sprite : Sprite)
    {
        this.collider = collider;
        this.sprite = sprite;

        this.position = {x: 0, y:0};
        this.scale = 1;
        this.rotation = 0;

        this.isActive = true;

        this.layer = "default";
        this.tag = "none";
    }
    getRealSprite() : Sprite
    {
        return new Sprite(
            this.sprite.vertices, 
            {x: this.sprite.position.x + this.position.x, y: this.sprite.position.y + this.position.y}, 
            this.sprite.scale * this.scale, 
            this.sprite.rotation + this.rotation
        );
    }
    getRealCollider() : Collider
    {
        if (this.sprite == null)
        {
            return new Collider(
                this.collider.vertices,
                {x: this.collider.position.x + this.position.x, y: this.collider.position.y + this.position.y},
                this.collider.scale * this.scale
            );
        }
        let spriteCenter = this.getRealSprite().findCenter();
        return new Collider(
            this.collider.vertices,
            {x: this.collider.position.x + spriteCenter.x, y: this.collider.position.y + spriteCenter.y},
            this.collider.scale * this.scale
        );
    }
    draw() : void
    {
        this.getRealSprite().draw();
    }
    update() : void
    {
        
    }

    static instanciate(original : GameObject) : GameObject
    {
        let instance = new GameObject(
            new Collider(original.collider.vertices, original.collider.position, original.collider.scale),
            new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation)
        );
        instance.position = Object.create(original.position);
        instance.scale = original.scale;
        instance.rotation = original.rotation;

        return instance;
    }
    static getObjectByTag(tag : string)
    {
        for (let key in gameObjects)
        {
            if (gameObjects[key].tag == tag)
            {
                return gameObjects[key];
            }
        }
        return null;
    }
}
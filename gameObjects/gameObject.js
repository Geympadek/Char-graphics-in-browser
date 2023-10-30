class GameObject
{
    position;
    scale;
    rotation;

    collider;
    sprite;

    onCollision(e)
    {

    }

    constructor(collider, sprite)
    {
        this.collider = collider;
        this.sprite = sprite;

        this.position = {x: 0, y:0};
        this.scale = 1;
        this.rotation = 0;
    }
    getRealSprite()
    {
        return new Sprite(
            this.sprite.vertices, 
            {x: this.sprite.position.x + this.position.x, y: this.sprite.position.y + this.position.y}, 
            this.sprite.scale * this.scale, 
            this.sprite.rotation + this.rotation
        );
    }
    getRealCollider()
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
    draw()
    {
        this.getRealSprite().draw();
    }
    update()
    {
        
    }

    static instanciate(original)
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
}
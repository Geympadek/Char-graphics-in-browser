class Projectile extends GameObject
{
    xSpeed : number;
    ySpeed : number;

    damage : number;

    constructor(collider : Collider, sprite : Sprite, damage : number)
    {
        super(collider, sprite);
        this.damage = damage;
    }

    update()
    {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;

        this.rotation += 3;
    }
    onCollision<T extends GameObject>(e : {collision: string, gameObject: T})
    {
        this.isActive = false;

        if (e.gameObject.hp != undefined)
        {
            e.gameObject.hp -= this.damage;
        }
    }
    static instanciate(original : Projectile)
    {
        let instance = new Projectile(
            new Collider(original.collider.vertices, original.collider.position, original.collider.scale),
            new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation),
            original.damage
        );
        instance.position = Object.create(original.position);
        instance.scale = original.scale;
        instance.rotation = original.rotation;

        instance.xSpeed = original.xSpeed;
        instance.ySpeed = original.ySpeed;

        return instance;
    }
}
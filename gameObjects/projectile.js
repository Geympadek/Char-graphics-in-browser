class Projectile extends GameObject
{
    xSpeed;
    ySpeed;

    damage;

    constructor(collider, sprite, damage)
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
    onCollision(e)
    {
        this.isActive = false;

        if (e.gameObject.hp != undefined)
        {
            e.gameObject.hp -= this.damage;
        }
    }
    static instanciate(original)
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
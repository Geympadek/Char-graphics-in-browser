class Enemy extends GameObject
{
    forwardMovement : SmoothMovement;
    rotationSpeed : number;

    hp : number;
    damage : number;
    
    constructor(collider : Collider, sprite : Sprite, hp : number)
    {
        super(collider, sprite);

        this.hp = hp;
    }
    
    onCollision(e: {collision: string, gameObject: GameObject})
    {
        if (e.gameObject.tag == "player")
        {
            e.gameObject.hp -= deltaTime;
            return;
        }
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

    update()
    {
        if (this.hp <= 0)
        {
            this.isActive = false;
        }
        
        let player = GameObject.getObjectByTag("player");
        if (player == null)
        {
            return;
        }
        let playerPosition = player.position;

        let direction = {x: playerPosition.x - this.position.x, y: playerPosition.y - this.position.y};
        let targetAngle = Math.atan2(direction.y, direction.x) / DEG_TO_RADIANS + 180;
        let angle = this.rotation % 360;
        angle = (angle + 360) % 360;
        
        let deltaSpeed = this.rotationSpeed * deltaTime;

        let angleDifference = Math.abs(angle - targetAngle);

        if (Math.floor(angle) != Math.floor(targetAngle))
        {
            if (angle < targetAngle)
            {
                if (angleDifference < 180)
                    this.rotation += deltaSpeed;
                else this.rotation -= deltaSpeed;
            }
            else
            {
                if (angleDifference < 180)
                    this.rotation -= deltaSpeed;
                else this.rotation += deltaSpeed;
            }
        }

        if (angleDifference > 180)
        {
            angleDifference = 360 - angleDifference;
        }
        
        if (angleDifference < 50)
        {
            this.forwardMovement.increase();
        }
        else
        {
            this.forwardMovement.decrease();
        }
        
        let forwardSpeed = this.forwardMovement.getCurrentSpeed() * deltaTime;
        this.position.x -= Math.cos((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
        this.position.y -= Math.sin((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
    }
    
    static instanciate(original : Enemy)
    {
        let instance = new Enemy(
            new Collider(original.collider.vertices, original.collider.position, original.collider.scale),
            new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation),
            original.hp
        );
        
        instance.position = original.position;
        instance.scale = original.scale;
        instance.rotation = original.rotation;

        instance.forwardMovement = new SmoothMovement(original.forwardMovement.maxSpeed, original.forwardMovement.acceleration, original.forwardMovement.deceleration);
        instance.rotationSpeed = original.rotationSpeed;

        instance.damage = original.damage;
        return instance;
    }
}
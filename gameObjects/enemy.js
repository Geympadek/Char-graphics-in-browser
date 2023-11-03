var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(collider, sprite, hp) {
        var _this = _super.call(this, collider, sprite) || this;
        _this.hp = hp;
        return _this;
    }
    Enemy.prototype.update = function () {
        if (this.hp <= 0) {
            this.isActive = false;
        }
        var playerPosition = gameObjects["rocket"].position;
        var direction = { x: playerPosition.x - this.position.x, y: playerPosition.y - this.position.y };
        var targetAngle = Math.atan2(direction.y, direction.x) / DEG_TO_RADIANS + 180;
        var angle = this.rotation % 360;
        angle = (angle + 360) % 360;
        var deltaSpeed = this.rotationSpeed * deltaTime;
        var angleDifference = Math.abs(angle - targetAngle);
        if (Math.floor(angle) != Math.floor(targetAngle)) {
            if (angle < targetAngle) {
                if (angleDifference < 180)
                    this.rotation += deltaSpeed;
                else
                    this.rotation -= deltaSpeed;
            }
            else {
                if (angleDifference < 180)
                    this.rotation -= deltaSpeed;
                else
                    this.rotation += deltaSpeed;
            }
        }
        if (angleDifference > 180) {
            angleDifference = 360 - angleDifference;
        }
        if (angleDifference < 50) {
            this.forwardMovement.increase();
        }
        else {
            this.forwardMovement.decrease();
        }
        var forwardSpeed = this.forwardMovement.getCurrentSpeed() * deltaTime;
        this.position.x -= Math.cos((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
        this.position.y -= Math.sin((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
    };
    Enemy.instanciate = function (original) {
        var instance = new Enemy(new Collider(original.collider.vertices, original.collider.position, original.collider.scale), new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation), original.hp);
        instance.position = original.position;
        instance.scale = original.scale;
        instance.rotation = original.rotation;
        instance.forwardMovement = new SmoothMovement(original.forwardMovement.maxSpeed, original.forwardMovement.acceleration, original.forwardMovement.deceleration);
        instance.rotationSpeed = original.rotationSpeed;
        instance.damage = original.damage;
        return instance;
    };
    return Enemy;
}(GameObject));

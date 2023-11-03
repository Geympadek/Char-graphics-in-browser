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
var SmoothMovement = /** @class */ (function () {
    function SmoothMovement(maxSpeed, acceleration, deceleration) {
        this.squaredSpeed = 0;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
    }
    SmoothMovement.prototype.increase = function () {
        if (this.squaredSpeed < this.maxSpeed * this.maxSpeed) {
            this.squaredSpeed += this.acceleration * deltaTime;
        }
    };
    SmoothMovement.prototype.decrease = function () {
        if (this.squaredSpeed > 0) {
            this.squaredSpeed -= this.deceleration * deltaTime;
        }
    };
    SmoothMovement.prototype.getCurrentSpeed = function () {
        if (this.squaredSpeed <= 0) {
            return 0;
        }
        return Math.sqrt(this.squaredSpeed);
    };
    return SmoothMovement;
}());
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    function Rocket(collider, sprite, hp) {
        var _this = _super.call(this, collider, sprite) || this;
        _this.hp = hp;
        return _this;
    }
    Rocket.prototype.update = function () {
        player.input.up ? this.forwardMovement.increase() : this.forwardMovement.decrease();
        var forwardSpeed = this.forwardMovement.getCurrentSpeed() * deltaTime;
        this.position.x += Math.cos((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
        this.position.y += Math.sin((this.rotation) * DEG_TO_RADIANS) * forwardSpeed;
        player.input.down ? this.backwardsMovement.increase() : this.backwardsMovement.decrease();
        var backwardsSpeed = this.backwardsMovement.getCurrentSpeed() * deltaTime;
        this.position.x -= Math.cos((this.rotation) * DEG_TO_RADIANS) * backwardsSpeed;
        this.position.y -= Math.sin((this.rotation) * DEG_TO_RADIANS) * backwardsSpeed;
        if (player.input.right) {
            this.rotation += this.rotationSpeed * deltaTime;
        }
        if (player.input.left) {
            this.rotation -= this.rotationSpeed * deltaTime;
        }
        if (this.hp <= 0) {
            this.isActive = false;
        }
    };
    Rocket.prototype.onCollision = function (e) {
        console.log("collision detected with rocket");
    };
    return Rocket;
}(GameObject));

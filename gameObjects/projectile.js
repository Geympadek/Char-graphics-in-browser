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
var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(collider, sprite, damage) {
        var _this = _super.call(this, collider, sprite) || this;
        _this.damage = damage;
        return _this;
    }
    Projectile.prototype.update = function () {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
        this.rotation += 3;
    };
    Projectile.prototype.onCollision = function (e) {
        this.isActive = false;
        if (e.gameObject.hp != undefined) {
            e.gameObject.hp -= this.damage;
        }
    };
    Projectile.instanciate = function (original) {
        var instance = new Projectile(new Collider(original.collider.vertices, original.collider.position, original.collider.scale), new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation), original.damage);
        instance.position = Object.create(original.position);
        instance.scale = original.scale;
        instance.rotation = original.rotation;
        instance.xSpeed = original.xSpeed;
        instance.ySpeed = original.ySpeed;
        return instance;
    };
    return Projectile;
}(GameObject));

var GameObject = /** @class */ (function () {
    function GameObject(collider, sprite) {
        this.collider = collider;
        this.sprite = sprite;
        this.position = { x: 0, y: 0 };
        this.scale = 1;
        this.rotation = 0;
        this.isActive = true;
        this.layer = "default";
        this.tag = "none";
    }
    GameObject.prototype.onCollision = function (e) {
    };
    GameObject.prototype.getRealSprite = function () {
        return new Sprite(this.sprite.vertices, { x: this.sprite.position.x + this.position.x, y: this.sprite.position.y + this.position.y }, this.sprite.scale * this.scale, this.sprite.rotation + this.rotation);
    };
    GameObject.prototype.getRealCollider = function () {
        if (this.sprite == null) {
            return new Collider(this.collider.vertices, { x: this.collider.position.x + this.position.x, y: this.collider.position.y + this.position.y }, this.collider.scale * this.scale);
        }
        var spriteCenter = this.getRealSprite().findCenter();
        return new Collider(this.collider.vertices, { x: this.collider.position.x + spriteCenter.x, y: this.collider.position.y + spriteCenter.y }, this.collider.scale * this.scale);
    };
    GameObject.prototype.draw = function () {
        this.getRealSprite().draw();
    };
    GameObject.prototype.update = function () {
    };
    GameObject.instanciate = function (original) {
        var instance = new GameObject(new Collider(original.collider.vertices, original.collider.position, original.collider.scale), new Sprite(original.sprite.vertices, original.sprite.position, original.sprite.scale, original.sprite.rotation));
        instance.position = Object.create(original.position);
        instance.scale = original.scale;
        instance.rotation = original.rotation;
        return instance;
    };
    GameObject.getObjectByTag = function (tag) {
        for (var key in gameObjects) {
            if (gameObjects[key].tag == tag) {
                return gameObjects[key];
            }
        }
        return null;
    };
    return GameObject;
}());

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
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border(collider, sprite) {
        return _super.call(this, collider, sprite) || this;
    }
    Border.prototype.onCollision = function (e) {
        var sourcePosition = this.getRealCollider().getGlobalPosition();
        var collidedPosition = e.gameObject.getRealCollider().getGlobalPosition();
        switch (e.collision) {
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
    };
    return Border;
}(GameObject));

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Collider = /** @class */ (function () {
    function Collider(vertices, position, scale) {
        this.vertices = [];
        this.vertices = __spreadArray([], vertices, true);
        this.position = Object.create(position);
        this.scale = scale;
    }
    Collider.prototype.getGlobalPosition = function () {
        return {
            start: { x: this.vertices[0] * this.scale + this.position.x,
                y: this.vertices[1] * this.scale + this.position.y },
            end: { x: this.vertices[2] * this.scale + this.position.x,
                y: this.vertices[3] * this.scale + this.position.y }
        };
    };
    Collider.prototype.visualize = function () {
        var globalPos = this.getGlobalPosition();
        var up = new Line({ x: globalPos.start.x, y: globalPos.start.y }, { x: globalPos.end.x, y: globalPos.start.y });
        up.draw();
        var down = new Line({ x: globalPos.start.x, y: globalPos.end.y }, { x: globalPos.end.x, y: globalPos.end.y });
        down.draw();
        var left = new Line({ x: globalPos.start.x, y: globalPos.start.y }, { x: globalPos.start.x, y: globalPos.end.y });
        left.draw();
        var right = new Line({ x: globalPos.end.x, y: globalPos.start.y }, { x: globalPos.end.x, y: globalPos.end.y });
        right.draw();
    };
    Collider.getCollision = function (a, b) {
        var aPos = a.getGlobalPosition();
        var bPos = b.getGlobalPosition();
        if (aPos.end.x < bPos.start.x ||
            aPos.start.x > bPos.end.x ||
            aPos.end.y < bPos.start.y ||
            aPos.start.y > bPos.end.y) {
            return null;
        }
        var overlapX = Math.min(aPos.end.x, bPos.end.x) - Math.max(aPos.start.x, bPos.start.x);
        var overlapY = Math.min(aPos.end.y, bPos.end.y) - Math.max(aPos.start.y, bPos.start.y);
        if (overlapX > overlapY) {
            if (aPos.start.y > bPos.start.y) {
                return "bottom";
            }
            return "top";
        }
        else {
            if (aPos.start.x < bPos.start.x) {
                return "left";
            }
            return "right";
        }
    };
    return Collider;
}());
var Sprite = /** @class */ (function () {
    function Sprite(vertices, position, scale, rotation) {
        this.vertices = [];
        this.vertices = __spreadArray([], vertices, true);
        this.position = Object.create(position);
        this.scale = scale;
        this.rotation = rotation;
    }
    Sprite.prototype.draw = function () {
        var primitives = [];
        for (var i = 0; i < this.vertices.length; i += 6) {
            var vertices = [];
            for (var j = 0; j < 6; j += 2) {
                vertices.push({ x: this.vertices[i + j] * this.scale + this.position.x, y: this.vertices[i + j + 1] * this.scale + this.position.y });
            }
            primitives.push(new Triangle(vertices[0], vertices[1], vertices[2]));
        }
        var center = this.findCenter();
        for (var i = 0; i < primitives.length; i++) {
            primitives[i].rotateAround(center, this.rotation).draw();
        }
    };
    Sprite.prototype.findCenter = function () {
        var minx = this.vertices[0];
        for (var i = 2; i < this.vertices.length; i += 2) {
            minx = Math.min(minx, this.vertices[i]);
        }
        var miny = this.vertices[1];
        for (var i = 3; i < this.vertices.length; i += 2) {
            miny = Math.min(miny, this.vertices[i]);
        }
        var maxx = this.vertices[0];
        for (var i = 2; i < this.vertices.length; i += 2) {
            maxx = Math.max(maxx, this.vertices[i]);
        }
        var maxy = this.vertices[1];
        for (var i = 3; i < this.vertices.length; i += 2) {
            maxy = Math.max(maxy, this.vertices[i]);
        }
        return { x: (minx + maxx) / 2 * this.scale + this.position.x, y: (miny + maxy) / 2 * this.scale + this.position.y };
    };
    return Sprite;
}());
var player = {
    input: { left: false, up: false, right: false, down: false, fire: false }
};
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
var KEY = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    F: 70
};
function onKeyDown(event) {
    switch (event.keyCode) {
        case KEY.W:
            player.input.up = true;
            break;
        case KEY.A:
            player.input.left = true;
            break;
        case KEY.S:
            player.input.down = true;
            break;
        case KEY.D:
            player.input.right = true;
            break;
        case KEY.F:
            player.input.fire = true;
            break;
    }
}
function onKeyUp(event) {
    switch (event.keyCode) {
        case KEY.W:
            player.input.up = false;
            break;
        case KEY.A:
            player.input.left = false;
            break;
        case KEY.S:
            player.input.down = false;
            break;
        case KEY.D:
            player.input.right = false;
            break;
        case KEY.F:
            player.input.fire = false;
            break;
    }
}
function updateObjects(objects) {
    for (var key in objects) {
        objects[key].update();
        if (objects[key].isActive == false) {
            delete objects[key];
        }
    }
}
function checkCollision(objects) {
    for (var keyI in objects) {
        for (var keyJ in objects) {
            if (objects[keyI] == objects[keyJ]) {
                continue;
            }
            var c = Collider.getCollision(objects[keyI].getRealCollider(), objects[keyJ].getRealCollider());
            if (c == null || c == undefined) {
                continue;
            }
            var e = {
                collision: c,
                gameObject: objects[keyJ]
            };
            if (objects[keyI].onCollision !== null) {
                objects[keyI].onCollision(e);
            }
        }
    }
}
function drawObjects(objects) {
    for (var key in objects) {
        if (objects[key].sprite == null || objects[key].sprite == undefined) {
            continue;
        }
        objects[key].draw();
    }
}

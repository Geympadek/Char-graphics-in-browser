function rotatePointAround(point, center, angle) {
    angle *= DEG_TO_RADIANS;
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    var rotatedPoint = {
        x: cosAngle * (point.x - center.x) - sinAngle * (point.y - center.y) + center.x,
        y: sinAngle * (point.x - center.x) + cosAngle * (point.y - center.y) + center.y
    };
    return rotatedPoint;
}
var Line = /** @class */ (function () {
    function Line(a, b) {
        this.a = a;
        this.b = b;
    }
    //Bresenham's rasterization algorithm
    Line.prototype.draw = function () {
        var p0 = { x: Math.round(this.a.x / coordPerPixel), y: Math.round(this.a.y / coordPerPixel) };
        var p1 = { x: Math.round(this.b.x / coordPerPixel), y: Math.round(this.b.y / coordPerPixel) };
        var d = { x: Math.abs(p0.x - p1.x), y: Math.abs(p0.y - p1.y) };
        var s = { x: (p0.x < p1.x) ? 1 : -1, y: (p0.y < p1.y) ? 1 : -1 };
        var error = d.x - d.y;
        var x = p0.x;
        var y = p0.y;
        while (x != p1.x || y != p1.y) {
            pixels[getPixelIndex(x, y)] = true;
            var e2 = 2 * error;
            if (e2 > -d.y) {
                error -= d.y;
                x += s.x;
            }
            if (e2 < d.x) {
                error += d.x;
                y += s.y;
            }
        }
        pixels[getPixelIndex(x, y)] = true;
    };
    Line.prototype.rotateAround = function (center, angle) {
        return new Line(rotatePointAround(this.a, center, angle), rotatePointAround(this.b, center, angle));
    };
    return Line;
}());
function sortVertices(a, b, c) {
    var _a;
    var d1 = { x: b.x - a.x, y: b.y - a.y };
    var d2 = { x: c.x - a.x, y: c.y - a.y };
    if (calculateCrossProduct(d1, d2) < 0) {
        _a = [c, b], b = _a[0], c = _a[1];
    }
    return [a, b, c];
}
function calculateCrossProduct(a, b) {
    return a.x * b.y - a.y * b.x;
}
var Triangle = /** @class */ (function () {
    function Triangle(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    Triangle.prototype.draw = function () {
        var points = sortVertices(this.a, this.b, this.c);
        points[0].x = Math.round(points[0].x / coordPerPixel);
        points[0].y = Math.round(points[0].y / coordPerPixel);
        points[1].x = Math.round(points[1].x / coordPerPixel);
        points[1].y = Math.round(points[1].y / coordPerPixel);
        points[2].x = Math.round(points[2].x / coordPerPixel);
        points[2].y = Math.round(points[2].y / coordPerPixel);
        //define bounding box
        var start = { x: Math.round(Math.min(points[0].x, points[1].x, points[2].x)), y: Math.round(Math.min(points[0].y, points[1].y, points[2].y)) };
        var end = { x: Math.round(Math.max(points[0].x, points[1].x, points[2].x)), y: Math.round(Math.max(points[0].y, points[1].y, points[2].y)) };
        for (var i = start.x; i <= end.x; i++) {
            for (var j = start.y; j <= end.y; j++) {
                if (Triangle.checkIfInside({ x: i, y: j }, points)) {
                    pixels[getPixelIndex(i, j)] = true;
                }
            }
        }
    };
    Triangle.checkIfInside = function (point, trianglePoints) {
        if (edgeFunction(trianglePoints[0], trianglePoints[1], point) < 0) {
            return false;
        }
        if (edgeFunction(trianglePoints[1], trianglePoints[2], point) < 0) {
            return false;
        }
        if (edgeFunction(trianglePoints[2], trianglePoints[0], point) < 0) {
            return false;
        }
        return true;
    };
    Triangle.prototype.rotateAround = function (center, angle) {
        return new Triangle(rotatePointAround(this.a, center, angle), rotatePointAround(this.b, center, angle), rotatePointAround(this.c, center, angle));
    };
    Triangle.prototype.rotateAroundItself = function (angle) {
        return this.rotateAround(this.findCentroid(), angle);
    };
    Triangle.prototype.findCentroid = function () {
        return {
            x: (this.a.x + this.b.x + this.c.x) / 3,
            y: (this.a.y + this.b.y + this.c.y) / 3
        };
    };
    return Triangle;
}());
var Circle = /** @class */ (function () {
    function Circle(center, radius) {
        this.center = center;
        this.radius = radius;
    }
    Circle.prototype.draw = function () {
        var center = { x: this.center.x / coordPerPixel, y: this.center.y / coordPerPixel };
        var radius = this.radius / coordPerPixel;
        var start = { x: center.x - radius, y: center.y - radius };
        var end = { x: center.x + radius, y: center.y + radius };
        start.x = Math.floor(start.x);
        start.y = Math.floor(start.y);
        end.x = Math.floor(end.x);
        end.y = Math.floor(end.y);
        for (var x = start.x; x <= end.x; x++) {
            for (var y = start.y; y <= end.y; y++) {
                var pixelRadius = 0.5;
                var xLeg = Math.abs(center.x - (x + pixelRadius));
                var yLeg = Math.abs(center.y - (y + pixelRadius));
                var distance = Math.sqrt(xLeg * xLeg + yLeg * yLeg);
                if (distance <= (radius + pixelRadius)) {
                    pixels[getPixelIndex(x, y)] = true;
                }
            }
        }
    };
    return Circle;
}());

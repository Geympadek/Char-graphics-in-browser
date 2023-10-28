class Collider
{
    vertices = [];
    position;
    scale;

    onCollision;

    constructor(vertices, position, scale, onCollision)
    {
        this.vertices = vertices;
        this.position = position;
        this.scale = scale;
        this.onCollision = onCollision;
    }

    getGlobalPosition()
    {
        return {
            start: {x: this.vertices[0] * this.scale + this.position.x,
                    y: this.vertices[1] * this.scale + this.position.y},
            end:   {x: this.vertices[2] * this.scale + this.position.x,
                    y: this.vertices[3] * this.scale + this.position.y}
        };
    }

    visualize()
    {
        let globalPos = this.getGlobalPosition();

        let up = new Line({x: globalPos.start.x, y: globalPos.start.y}, {x: globalPos.end.x, y: globalPos.start.y});
        up.draw();

        let down = new Line({x: globalPos.start.x, y: globalPos.end.y}, {x: globalPos.end.x, y: globalPos.end.y});
        down.draw();
        
        let left = new Line({x: globalPos.start.x, y: globalPos.start.y}, {x: globalPos.start.x, y: globalPos.end.y});
        left.draw();

        let right = new Line({x: globalPos.end.x, y: globalPos.start.y}, {x: globalPos.end.x, y: globalPos.end.y});
        right.draw();
    }

    static getCollision(a, b)
    {
        const aPos = a.getGlobalPosition();
        const bPos = b.getGlobalPosition();

        if (aPos.end.x < bPos.start.x ||
            aPos.start.x > bPos.end.x ||
            aPos.end.y < bPos.start.y ||
            aPos.start.y > bPos.end.y){
            return null;
        }

        const overlapX = Math.min(aPos.end.x, bPos.end.x) - Math.max(aPos.start.x, bPos.start.x);
        const overlapY = Math.min(aPos.end.y, bPos.end.y) - Math.max(aPos.start.y, bPos.start.y);

        if (overlapX > overlapY)
        {
            if (aPos.start.y > bPos.start.y)
            {
                return "bottom";
            }
            return "top";
        }
        else
        {
            if (aPos.start.x < bPos.start.x)
            {
                return "left";
            }
            return "right";
        }
    }
}

class Sprite
{
    vertices = [];
    position;
    scale;
    rotation;

    constructor(vertices, position, scale, rotation)
    {
        this.vertices = vertices;
        this.position = position;
        this.scale = scale;
        this.rotation = rotation;
    }

    draw()
    {
        let primitives = [];
        
        for (let i = 0; i < this.vertices.length; i+=6)
        {
            let vertices = [];
            for (let j = 0; j < 6; j+=2)
            {
                vertices.push({x: this.vertices[i + j] * this.scale + this.position.x, y: this.vertices[i + j + 1] * this.scale + this.position.y});
            }

            primitives.push(new Triangle(vertices[0], vertices[1], vertices[2]));
        }

        for (let i = 0, minx = primitives[0].a.x, miny = primitives[0].a.y; i < primitives; i++)
        {
            minx = Math.min(minx, primitives[i].a.x, primitives[i].b.x, primitives[i].c.x);
            miny = Math.min(miny, primitives[i].a.y, primitives[i].b.y, primitives[i].c.y);
        }
        
        let center = this.findCenter();
        for (let i = 0; i < primitives.length; i++)
        {
            primitives[i].rotateAround(center, this.rotation).draw();
        }
    }

    findCenter()
    {
        let minx = this.vertices[0];
        for (let i = 2; i < this.vertices.length; i+=2)
        {
            minx = Math.min(minx, this.vertices[i]);
        }
        let miny = this.vertices[1];
        for (let i = 3; i < this.vertices.length; i+=2)
        {
            miny = Math.min(miny, this.vertices[i]);
        }

        let maxx = this.vertices[0];
        for (let i = 2; i < this.vertices.length; i+=2)
        {
            maxx = Math.max(maxx, this.vertices[i]);
        }
        let maxy = this.vertices[1];
        for (let i = 3; i < this.vertices.length; i+=2)
        {
            maxy = Math.max(maxy, this.vertices[i]);
        }

        return {x: (minx + maxx) / 2 * this.scale + this.position.x, y: (miny + maxy) / 2 * this.scale + this.position.y};
    }
}

var player =
{
    input: {left: false, up: false, right: false, down: false, fire: false}
}

document.addEventListener("keydown", onkeydown, false);
document.addEventListener("keyup", onkeyup, false);

const KEY =
{
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    F: 70
}

function onkeydown(event)
{
    switch (event.keyCode)
    {
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

function onkeyup(event)
{
    switch (event.keyCode)
    {
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

function checkCollision(objects)
{
    for (let i = 0; i < objects.length; i++)
    {
        for (let j = 0; j < objects.length; j++)
        {
            if (Collider.checkCollision(objects[i], objects[j]) !== null)
            {
                console.log("Intersecection");
            }
        }
    }
}
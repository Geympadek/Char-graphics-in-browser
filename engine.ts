class Collider
{
    vertices : number[] = [];
    position : {x: number, y: number};
    scale : number;

    constructor(
        vertices : number[],
        position : {x: number, y: number},
        scale : number)
    {
        this.vertices = [...vertices];
        this.position = Object.create(position);
        this.scale = scale;
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

    visualize() : void
    {
        let globalPos = this.getGlobalPosition();

        let up : Line = new Line({x: globalPos.start.x, y: globalPos.start.y}, {x: globalPos.end.x, y: globalPos.start.y});
        up.draw();

        let down : Line = new Line({x: globalPos.start.x, y: globalPos.end.y}, {x: globalPos.end.x, y: globalPos.end.y});
        down.draw();
        
        let left : Line = new Line({x: globalPos.start.x, y: globalPos.start.y}, {x: globalPos.start.x, y: globalPos.end.y});
        left.draw();

        let right : Line = new Line({x: globalPos.end.x, y: globalPos.start.y}, {x: globalPos.end.x, y: globalPos.end.y});
        right.draw();
    }

    static getCollision(a : Collider, b : Collider)
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
    vertices : number[] = [];
    position : {x: number, y: number};
    scale : number;
    rotation : number;

    constructor(vertices : number[],
        position : {x: number, y: number},
        scale : number,
        rotation : number){
        this.vertices = [...vertices];
        this.position = Object.create(position);
        this.scale = scale;
        this.rotation = rotation;
    }
    draw() : void
    {
        let primitives : Triangle[] = [];
        
        for (let i = 0; i < this.vertices.length; i+=6)
        {
            let vertices : {x: number, y:number}[] = [];
            for (let j = 0; j < 6; j+=2)
            {
                vertices.push({x: this.vertices[i + j] * this.scale + this.position.x, y: this.vertices[i + j + 1] * this.scale + this.position.y});
            }

            primitives.push(new Triangle(vertices[0], vertices[1], vertices[2]));
        }

        let center = this.findCenter();
        for (let i = 0; i < primitives.length; i++)
        {
            primitives[i].rotateAround(center, this.rotation).draw();
        }
    }

    findCenter() : {x: number, y:number}
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
    input: {left: false, up: false, right: false, down: false, fire: false, spawn: false}
}

document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);

const KEY =
{
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    F: 70,
    SPACE: 32,
}

function onKeyDown(event)
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
        case KEY.SPACE:
            player.input.spawn = true;
            break;
    }
}

function onKeyUp(event)
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
        case KEY.SPACE:
            player.input.spawn = false;
            break;
    }
}

function updateObjects<T extends GameObject>(objects : T[]) : void
{
    for (let key in objects)
    {
        objects[key].update();

        if (objects[key].isActive == false)
        {
            delete objects[key];
        }
    }
}
function checkCollision<T extends GameObject>(objects : T[]) : void
{
    for (let keyI in objects)
    {
        for (let keyJ in objects)
        {
            if (objects[keyI] == objects[keyJ])
            {
                continue;
            }

            let c = Collider.getCollision(objects[keyI].getRealCollider(), objects[keyJ].getRealCollider());
            if (c == null || c == undefined)
            {
                continue;
            }

            let e = {
                collision: c,
                gameObject: objects[keyJ]
            };

            if (objects[keyI].onCollision !== null)
            {
                objects[keyI].onCollision(e);
            }
        }
    }
}
function drawObjects<T extends GameObject>(objects : T[])
{
    for (let key in objects)
    {
        if (objects[key].sprite == null || objects[key].sprite == undefined)
        {
            continue;
        }
        objects[key].draw();
    }
}
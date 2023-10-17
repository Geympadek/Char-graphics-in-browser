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
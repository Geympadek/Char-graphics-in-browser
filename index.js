var screenOutput = "W";//Basically text that is shown in the paragraph
var pixels;//Hidden array of boolean values. Important for rasterization.

const symbolWidth = 2; //Width of one character in pixels
const symbolHeight = 4; //Height of one character in pixels

const pixelsPerSymbol = symbolHeight * symbolWidth;

const numOfColumns = 140;
const numOfRows = 30;

const numOfSymbols = numOfColumns * numOfRows;
const numOfPixels = numOfSymbols * pixelsPerSymbol;

pixels = new Array(numOfPixels);
pixels.fill(false);

const pixelWidth = numOfColumns * symbolWidth;//number of pixels from left to right
const pixelHeight = numOfRows * symbolHeight;//number of pixels from top to bottom

const coordPerPixel = 1 / symbolWidth;

const center = { x: pixelWidth * coordPerPixel / 2, y: pixelHeight * coordPerPixel / 2 };

class Line 
{
    a;
    b;
    constructor(a, b)
    {
        if (typeof a !== "object" || typeof b !== "object")
        {
            throw new Error("Arguments should be of type \"object\"");
        }
        this.a = a;
        this.b = b;
    }
    //Bresenham's rasterization algorithm
    draw()
    {
        let p0 = { x: Math.round(this.a.x / coordPerPixel), y: Math.round(this.a.y / coordPerPixel)};
        let p1 = { x: Math.round(this.b.x / coordPerPixel), y: Math.round(this.b.y / coordPerPixel)};

        let d = { x: Math.abs(p0.x - p1.x), y: Math.abs(p0.y - p1.y)};
        let s = { x: (p0.x < p1.x) ? 1 : -1, y: (p0.y < p1.y) ? 1 : -1};

        let error = d.x - d.y;
        let x = p0.x;
        let y = p0.y;

        while (x != p1.x || y != p1.y)
        {
            pixels[getPixelIndex(x, y)] = true;

            let e2 = 2 * error;
            if (e2 > -d.y)
            {
                error -= d.y;
                x += s.x;
            }
            if (e2 < d.x)
            {
                error += d.x;
                y += s.y;
            }
        }
        pixels[getPixelIndex(x, y)] = true;
    }

    rotateAround(center, angle)
    {
        return new Line(rotatePointAround(this.a, center, angle), rotatePointAround(this.b, center, angle));
    }
}

class Triangle
{
    a;
    b;
    c;
    constructor(a, b, c)
    {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    draw()
    {
        let points = sortVertices(this.a, this.b, this.c);

        points[0].x = Math.floor(points[0].x / coordPerPixel);
        points[0].y = Math.floor(points[0].y / coordPerPixel);
        points[1].x = Math.floor(points[1].x / coordPerPixel);
        points[1].y = Math.floor(points[1].y / coordPerPixel);
        points[2].x = Math.floor(points[2].x / coordPerPixel);
        points[2].y = Math.floor(points[2].y / coordPerPixel);

        //define bounding box
        let start = {x: Math.round(Math.min(points[0].x, points[1].x, points[2].x)), y: Math.round(Math.min(points[0].y, points[1].y, points[2].y))};
        let end = {x: Math.round(Math.max(points[0].x, points[1].x, points[2].x)), y: Math.round(Math.max(points[0].y, points[1].y, points[2].y))};

        for (let i = start.x; i <= end.x; i++)
        {
            for (let j = start.y; j <= end.y; j++)
            {
                if (this.checkIfInside({x: i, y: j}))
                {
                    pixels[getPixelIndex(i, j)] = true;
                }
            }
        }
    }
    checkIfInside(point)
    {
        if (edgeFunction(this.a, this.b, point) < 0)
        {
            return false;
        }
        if (edgeFunction(this.b, this.c, point) < 0)
        {
            return false;
        }
        if (edgeFunction(this.c, this.a, point) < 0)
        {
            return false;
        }
        return true;
    }
    rotateAround(center, angle)
    {
        return new Triangle(
            rotatePointAround(this.a, center, angle),
            rotatePointAround(this.b, center, angle),
            rotatePointAround(this.c, center, angle)
        );
    }
    rotateAroundItself(angle)
    {
        return this.rotateAround(this.findCentroid(), angle);
    }
    findCentroid()
    {
        return {
            x: (this.a.x + this.b.x + this.c.x) / 3,
            y: (this.a.y + this.b.y + this.c.y) / 3 };
    }
}

function sortVertices(a, b, c)
{
    let d1 = {x: b.x - a.x, y: b.y - a.y};
    let d2 = {x: c.x - a.x, y: c.y - a.y};

    if (calculateCrossProduct(d1, d2) < 0)
    {
        [b, c] = [c, b];
    }
    return [a, b, c];
}

function calculateCrossProduct(a, b)
{
    return a.x * b.y - a.y * b.x;
}

function edgeFunction(a, b, p)
{
    return (a.y - b.y) * (p.x - a.x) - (b.x - a.x) * (a.y - p.y);
}

const DEG_TO_RADIANS = 0.017453292;

function rotatePointAround(point, center, angle)
{
    angle *= DEG_TO_RADIANS;

    let cosAngle = Math.cos(angle);
    let sinAngle = Math.sin(angle);

    let rotatedPoint = {
        x: cosAngle * (point.x - center.x) - sinAngle * (point.y - center.y) + center.x,
        y: sinAngle * (point.x - center.x) + cosAngle * (point.y - center.y) + center.y  
    };
    return rotatedPoint;
}

function getPixelIndex(x, y)
{
    if (x < 0 || x > pixelWidth)
    {
        return numOfPixels;
    }
    if (y < 0 || y > pixelHeight)
    {
        return numOfPixels;
    }

    let index = x + y * pixelWidth;
    index = Math.round(index);
    
    return index;
}

function fillWith(filler)
{
    screenOutput = "";
    for (let l = 0; l < numOfRows; l++)
    {
        for (let e = 0; e < numOfColumns; e++)
        {
            screenOutput += filler;
        }
        screenOutput += "<br>";
    }   
}

function symbolFromBrightness(brightness)
{
    //const brightnessSymbols = " .:-=+*#@";
    const brightnessSymbols = [" ", ".", ":", "-", "=", "+", "*", "#", "@"];

    if (brightness == 0)
    {
        return brightnessSymbols[0];
    }
    brightness *= (brightnessSymbols.length - 2);
    brightness++;
    brightness = Math.floor(brightness);

    return brightnessSymbols[brightness];
}

function brightnessFromPixels(symbolx, symboly)
{
    let brightness = 0;
    for (let l = 0; l < symbolHeight; l++)
    {
        for (let e = 0; e < symbolWidth; e++)
        {
            let index = getPixelIndex(symbolx * symbolWidth + e, symboly * symbolHeight + l);

            if (pixels[index] == true)
            {
                brightness += (1 / pixelsPerSymbol);
            }
        }
    }
    return brightness;
}

function pixelsToScreen()
{
    screenOutput = "";

    for (let y = 0; y < numOfRows; y++)
    {
        for (let x = 0; x < numOfColumns; x++)
        {
            let brightness = brightnessFromPixels(x, y);
            screenOutput += symbolFromBrightness(brightness);
        }
        screenOutput += "<br>";
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

function clearScreen()
{
    pixels.fill(false);
}

let tick = 0;
let triangleLength = 25;
function loop()
{
    clearScreen();
    tick++;

    let sprite = new Sprite([0,2, 1,1, 1,2,     0,0, 1,0, 1,1,      1,0, 3,0, 1,2,      3,0, 3,2, 1,2,  3,0, 4,1, 3,2], center, 3.5, tick * 2);
    sprite.draw();

    //rendering and rasterization
    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;

    setTimeout(loop, 1000 / 60);
}
loop();
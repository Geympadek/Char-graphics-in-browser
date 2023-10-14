var screenOutput = "W";
var pixels;

const symbolWidth = 2;
const symbolHeight = 4;

const pixelsPerSymbol = symbolHeight * symbolWidth;

const width = 140;
const height = 30;

pixels = new Array(width * height * pixelsPerSymbol);
pixels.fill(false);

const pixelWidth = width * symbolWidth;
const pixelHeight = height * symbolHeight;

const coordPerPixel = 1 / symbolWidth;

class Point 
{
    x;
    y;

    constructor(x, y) 
    {
        this.x = x;
        this.y = y;
    }
}
const center = new Point(pixelWidth * coordPerPixel / 2, pixelHeight * coordPerPixel / 2);


class Line 
{
    a;
    b;
    
    constructor(a, b)
    {
        this.a = a;
        this.b = b;
    }
    draw()
    {
        let pixelA = new Point(this.a.x * symbolWidth, this.a.y * symbolWidth);
        let pixelB = new Point(this.b.x * symbolWidth, this.b.y * symbolWidth);

        let d = new Point(Math.abs(pixelA.x - pixelB.x), Math.abs(pixelA.y - pixelB.y));
        let s = new Point((pixelA.x < pixelB.x) ? 1 : -1, (pixelA.y < pixelB.y) ? 1 : -1);

        let error = d.x - d.y;
        let x = pixelA.x;
        let y = pixelA.y;

        while (x != pixelB.x || y != pixelB.y)
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
}

function edgeFunction(a, b, p)
{
    return (a.y - b.y) * (p.x - a.x) - (b.x - a.x) * (a.y - p.y);
}

function getPixelIndex(x, y)
{
    let index = x + y * pixelWidth;
    index = Math.round(index);
    return index;
}

function fillWith(filler)
{
    screenOutput = "";
    for (let l = 0; l < height; l++)
    {
        for (let e = 0; e < width; e++)
        {
            screenOutput += filler;
        }
        screenOutput += "\n";
    }   
}

function symbolFromBrightness(brightness)
{
    //const brightnessSymbols = " .:-=+*#@";
    const brightnessSymbols = ["&emsp;", ".", ":", "-", "=", "+", "*", "#", "@"];

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

    for (let y = 0; y < height; y++)
    {
        for (let x = 0; x < width; x++)
        {
            let brightness = brightnessFromPixels(x, y);
            screenOutput += symbolFromBrightness(brightness);
        }
        screenOutput += "<br>";
    }
}

let tick = 0;
let lineLength = 20;
function loop()
{
    pixels.fill(false);
    tick++;

    let line = new Line(center, new Point(center.x + Math.floor(Math.cos(tick / 200) * lineLength), center.y +  Math.floor(Math.sin(tick / 200) * lineLength)));
    line.draw();
    
    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;

    setTimeout(loop, 1 / 30);
}

loop();

//let line = new Line(center, new Point((width - 1) * Math.random(), (height - 1) * Math.random()));

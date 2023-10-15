var screenOutput = "W";//Basically text that is shown in the paragraph
var pixels;//Hidden array of boolean values. Important for rasterization.

const symbolWidth = 2; //Width of one character in pixels
const symbolHeight = 4; //Height of one character in pixels

const pixelsPerSymbol = symbolHeight * symbolWidth;

const numOfColumns = 140;
const numOfRows = 30;

const numOfSymbols = numOfColumns * numOfRows;

pixels = new Array(numOfSymbols * pixelsPerSymbol);
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
        this.a = a;
        this.b = b;
    }
    //Bresenham's rasterization algorithm
    draw()
    {
        let p0 = { x: this.a.x * symbolWidth, y: this.a.y * symbolWidth};
        let p1 = { x: this.b.x * symbolWidth, y: this.b.y * symbolWidth};

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

let tick = 0;
let lineLength = 20;
function loop()
{
    pixels.fill(false);
    tick++;

    let line = new Line(center, { x: center.x + Math.floor(Math.cos(tick / 200) * lineLength), y: center.y +  Math.floor(Math.sin(tick / 200) * lineLength)});
    line.draw();
    
    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;

    setTimeout(loop, 1 / 30);
}
loop();
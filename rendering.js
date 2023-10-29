var screenOutput = "W";//Basically text that is shown in the paragraph
var pixels;//Hidden array of boolean values. Important for rasterization.
//2/4 5/12
const symbolWidth = 6; //Width of one character in pixels
const symbolHeight = 13; //Height of one character in pixels

const pixelsPerSymbol = symbolHeight * symbolWidth;

const numOfColumns = 140;
const numOfRows = 30;

const numOfSymbols = numOfColumns * numOfRows;
const numOfPixels = numOfSymbols * pixelsPerSymbol;

pixels = new Array(numOfPixels);
clearScreen();

const pixelWidth = numOfColumns * symbolWidth;//number of pixels from left to right
const pixelHeight = numOfRows * symbolHeight;//number of pixels from top to bottom

const coordPerPixel = 1 / symbolWidth;

const center = { x: pixelWidth * coordPerPixel / 2, y: pixelHeight * coordPerPixel / 2 };

function edgeFunction(a, b, p)
{
    return (a.y - b.y) * (p.x - a.x) - (b.x - a.x) * (a.y - p.y);
}

const DEG_TO_RADIANS = 0.017453292;

function getPixelIndex(x, y)
{
    if (x < 0 || x >= pixelWidth)
    {
        return numOfPixels;
    }
    if (y < 0 || y >= pixelHeight)
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
    const brightnessSymbols = " .:-=+*#%@";

    brightness *= (brightnessSymbols.length - 1);
    brightness = Math.round(brightness);

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

function clearScreen()
{
    pixels.fill(false);
}
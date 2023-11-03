var screenOutput = "W"; //Basically text that is shown in the paragraph
var pixels;
//2/4 5/12
var symbolWidth = 6; //Width of one character in pixels
var symbolHeight = 13; //Height of one character in pixels
var pixelsPerSymbol = symbolHeight * symbolWidth;
var numOfColumns = 140;
var numOfRows = 30;
var numOfSymbols = numOfColumns * numOfRows;
var numOfPixels = numOfSymbols * pixelsPerSymbol;
pixels = new Array(numOfPixels);
clearScreen();
var pixelWidth = numOfColumns * symbolWidth; //number of pixels from left to right
var pixelHeight = numOfRows * symbolHeight; //number of pixels from top to bottom
var coordPerPixel = 1 / symbolWidth;
var center = { x: pixelWidth * coordPerPixel / 2, y: pixelHeight * coordPerPixel / 2 };
function edgeFunction(a, b, p) {
    return (a.y - b.y) * (p.x - a.x) - (b.x - a.x) * (a.y - p.y);
}
var DEG_TO_RADIANS = 0.017453292;
function getPixelIndex(x, y) {
    if (x < 0 || x >= pixelWidth) {
        return numOfPixels;
    }
    if (y < 0 || y >= pixelHeight) {
        return numOfPixels;
    }
    var index = x + y * pixelWidth;
    index = Math.round(index);
    return index;
}
function fillWith(filler) {
    screenOutput = "";
    for (var l = 0; l < numOfRows; l++) {
        for (var e = 0; e < numOfColumns; e++) {
            screenOutput += filler;
        }
        screenOutput += "<br>";
    }
}
function symbolFromBrightness(brightness) {
    var brightnessSymbols = " .:-=+*#%@";
    brightness *= (brightnessSymbols.length - 1);
    brightness = Math.round(brightness);
    return brightnessSymbols[brightness];
}
function brightnessFromPixels(symbolx, symboly) {
    var brightness = 0;
    for (var l = 0; l < symbolHeight; l++) {
        for (var e = 0; e < symbolWidth; e++) {
            var index = getPixelIndex(symbolx * symbolWidth + e, symboly * symbolHeight + l);
            if (pixels[index] == true) {
                brightness += (1 / pixelsPerSymbol);
            }
        }
    }
    return brightness;
}
function pixelsToScreen() {
    screenOutput = "";
    for (var y = 0; y < numOfRows; y++) {
        for (var x = 0; x < numOfColumns; x++) {
            var brightness = brightnessFromPixels(x, y);
            screenOutput += symbolFromBrightness(brightness);
        }
        screenOutput += "<br>";
    }
}
function clearScreen() {
    pixels.fill(false);
}

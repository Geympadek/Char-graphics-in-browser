let tick = 0;
let triangleLength = 25;

let sprite = new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x: center.x / 1, y: center.y / 2}, 5, 0);

function loop()
{
    clearScreen();
    tick++;
    
    let rocketSpeed = 3;
    rocketSpeed /= 10;

    sprite.rotation = tick;
    sprite.position.x += Math.cos((sprite.rotation) * DEG_TO_RADIANS) * rocketSpeed;
    sprite.position.y += Math.sin((sprite.rotation) * DEG_TO_RADIANS) * rocketSpeed;

    sprite.draw();

    //rendering and rasterization
    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;

    setTimeout(loop, 1000 / 60);
}
loop();
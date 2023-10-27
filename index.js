let tick = 0;
let triangleLength = 25;

let sprite = new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x: center.x / 1, y: center.y / 2}, 2.9, 0);

function loop()
{
    clearScreen();
    tick++;
    
    let rocketSpeed = 1;

    let rotationSpeed = 2;

    sprite.draw();

    if (player.input.up)
    {   
        sprite.position.x += Math.cos((sprite.rotation) * DEG_TO_RADIANS) * rocketSpeed;
        sprite.position.y += Math.sin((sprite.rotation) * DEG_TO_RADIANS) * rocketSpeed;
    }
    else if (player.input.down)
    {
        sprite.position.x -= Math.cos((sprite.rotation) * DEG_TO_RADIANS) * rocketSpeed;
        sprite.position.y -= Math.sin((sprite.rotation) * DEG_TO_RADIANS) * rocketSpeed;
    }

    if (player.input.left)
    {
        sprite.rotation -= rotationSpeed;
    }
    else if (player.input.right)
    {
        sprite.rotation += rotationSpeed;
    }

    let circle = new Circle(center, 15);
    circle.draw();

    //rendering and rasterization
    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;

    setTimeout(loop, 16.6);
}
loop();
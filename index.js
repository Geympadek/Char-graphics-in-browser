let sprite = new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x: center.x / 1, y: center.y / 2}, 2.9, 0);

let timer = 0;
function loop()
{
    let deltaTime = Date.now() - timer;
    timer = Date.now();

    console.log(1000 / deltaTime);

    clearScreen();
    
    let rocketSpeed = 3.5 * deltaTime / 100;

    let rotationSpeed = 6 * deltaTime / 100;

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

    let rocketCenter = sprite.findCenter();
    let rocketCollider = new Collider([-1, -1, 1, 1], rocketCenter, 10, null);
    rocketCollider.visualize();

    let someCollider = new Collider([0, 0, 1, 1], center, 10, null);
    someCollider.visualize();

    if (Collider.getCollision(rocketCollider, someCollider) == "yes")
    {
        console.log("Intersection");
    }

    //rendering and rasterization
    pixelsToScreen();

    document.getElementById("screen").innerHTML = screenOutput;
    setTimeout(loop, 0);
}
loop();
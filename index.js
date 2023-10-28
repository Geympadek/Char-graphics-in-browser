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

    //let circle = new Circle(center, 15);
    //circle.draw();

    let rocketCenter = sprite.findCenter();
    let rocketCollider = new Collider([-1, -1, 1, 1], rocketCenter, 5.5, null);
    //rocketCollider.visualize();

    let someCollider = new Collider([0, 0, 1, 1], center, 10, null);
    someCollider.visualize();

    const collision = Collider.getCollision(rocketCollider, someCollider);
    if (collision != null)
    {
        console.log("Intersection at the", collision);

        const rocketPosition = rocketCollider.getGlobalPosition();
        const collPosition = someCollider.getGlobalPosition();

        switch(collision)
        {
            case "top":
                sprite.position.y -= rocketPosition.end.y - collPosition.start.y;
                break;
            case "bottom":
                sprite.position.y += collPosition.end.y - rocketPosition.start.y;
                break;
            case "left":
                sprite.position.x -= rocketPosition.end.x - collPosition.start.x;
                break;
            case "right":
                sprite.position.x += collPosition.end.x - rocketPosition.start.x;
                break;
        }
    }

    //rendering and rasterization
    pixelsToScreen();

    document.getElementById("screen").innerHTML = screenOutput;
    setTimeout(loop, 0);
}
loop();
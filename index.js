var gameObjects = {};

function onCollisionBorder(e)
{
    let sourcePosition =  e.source.getRealCollider().getGlobalPosition();
    let collidedPosition = e.gameObject.getRealCollider().getGlobalPosition();
    switch(e.collision)
    {
        case "right":
            console.log("border-right");
            e.gameObject.position.x -= collidedPosition.end.x - sourcePosition.start.x;
            break;
        case "left":
            console.log("border-left");
            e.gameObject.position.x += sourcePosition.end.x - collidedPosition.start.x;
            break;
        case "top":
            console.log("border-top");
            e.gameObject.position.y += sourcePosition.end.y - collidedPosition.start.y;
            break;
        case "bottom":
            e.gameObject.position.y -= collidedPosition.end.y - sourcePosition.start.y;
            console.log("border-bottom");
            break;
    }
}

gameObjects["border-up"] = new GameObject(
    new Collider([0, -10,    pixelWidth * coordPerPixel, 0], {x:0, y:0}, 1),
    null,
    onCollisionBorder
);
gameObjects["border-down"] = new GameObject(
    new Collider([0, pixelHeight * coordPerPixel,    pixelWidth * coordPerPixel, pixelHeight * coordPerPixel + 10], {x:0, y:0}, 1),
    null,
    onCollisionBorder
);
gameObjects["border-left"] = new GameObject(
    new Collider([-10, 0,    0, pixelHeight * coordPerPixel], {x:0, y:0}, 1),
    null,
    onCollisionBorder
);
gameObjects["border-right"] = new GameObject(
    new Collider([pixelWidth * coordPerPixel, 0,    pixelWidth * coordPerPixel, pixelHeight * coordPerPixel + 10], {x:0, y:0}, 1),
    null,
    onCollisionBorder
);


gameObjects["border-up"].position = {x: 0, y: 0};
gameObjects["border-up"].scale = 1;

gameObjects["rocket"] = new GameObject(
    new Collider([-1, -1, 1, 1], {x: 0, y:0}, 6),
    new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x:0, y:0}, 2.9, 0),
    function(e)
    {
        //console.log("intersection at the", e.collision);
    }
);
gameObjects["rocket"].position = Object.create(center);
gameObjects["rocket"].position.y += 10;
gameObjects["rocket"].scale = 1;

var deltaTime = 0;
function handleInput()
{
    let rocketSpeed = 3.5 * deltaTime / 100;
    let rotationSpeed = 6 * deltaTime / 100;

    if (player.input.up)
    {
        gameObjects["rocket"].position.x += Math.cos((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * rocketSpeed;
        gameObjects["rocket"].position.y += Math.sin((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * rocketSpeed;
    }
    if (player.input.down)
    {
        gameObjects["rocket"].position.x -= Math.cos((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * rocketSpeed;
        gameObjects["rocket"].position.y -= Math.sin((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * rocketSpeed;
    }

    if (player.input.left)
    {
        gameObjects["rocket"].rotation -= rotationSpeed;
    }
    if (player.input.right)
    {
        gameObjects["rocket"].rotation += rotationSpeed;
    }

    if (player.input.fire)
    {
        gameObjects["rocket"].getRealCollider().visualize();
    }
}

let timer = 0;
function loop()
{
    deltaTime = Date.now() - timer;
    timer = Date.now();

    clearScreen();

    handleInput();
    gameObjects["border-up"].getRealCollider().visualize();
    gameObjects["border-down"].getRealCollider().visualize();
    gameObjects["border-left"].getRealCollider().visualize();
    gameObjects["border-right"].getRealCollider().visualize();
    
    checkCollision(gameObjects);
    drawObjects(gameObjects);

    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;
    setTimeout(loop, 0);
}
loop();
var gameObjects = {};
gameObjects["rocket"] = new GameObject(
    new Collider([-1, -1, 1, 1], {x: 0, y:0}, 6),
    new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x:0, y:0}, 2.9, 0),
    function(e)
    {
        console.log("intersection at the", e.collision);
    }
);
gameObjects["rocket"].position = Object.create(center);
gameObjects["rocket"].position.y += 10;
gameObjects["rocket"].scale = 1;

gameObjects["something else"] = new GameObject(gameObjects["rocket"].collider, gameObjects["rocket"].sprite, null);
gameObjects["something else"].position = {x: center.x - 20, y: center.y - 10};

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
    else if (player.input.down)
    {
        gameObjects["rocket"].position.x -= Math.cos((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * rocketSpeed;
        gameObjects["rocket"].position.y -= Math.sin((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * rocketSpeed;
    }

    if (player.input.left)
    {
        gameObjects["rocket"].rotation -= rotationSpeed;
    }
    else if (player.input.right)
    {
        gameObjects["rocket"].rotation += rotationSpeed;
    }
}

let timer = 0;
function loop()
{
    deltaTime = Date.now() - timer;
    timer = Date.now();

    clearScreen();

    handleInput();
    
    checkCollision(gameObjects);
    drawObjects(gameObjects);
    gameObjects["rocket"].getRealCollider().visualize();
    gameObjects["something else"].getRealCollider().visualize();

    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;
    setTimeout(loop, 0);
}
loop();
var deltaTime = 0;
let isSingleClick = true;
let projectileCount = 3;
function handleInput()
{
    if (player.input.fire)
    {
        if (isSingleClick)
        {
            console.log("single click detected!");
            
            let distance = 13;
            let name = "projectile" + String(projectileCount++);
            gameObjects[name] = Projectile.instanciate(projectile);
            gameObjects[name].position = gameObjects["rocket"].getRealSprite().findCenter();
            gameObjects[name].position.x += Math.cos((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * distance;
            gameObjects[name].position.y += Math.sin((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * distance;

            let projectileSpeed = 2 * Math.random();
            gameObjects[name].xSpeed = Math.cos((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * projectileSpeed;
            gameObjects[name].ySpeed = Math.sin((gameObjects["rocket"].rotation) * DEG_TO_RADIANS) * projectileSpeed;

            isSingleClick = false;
        }
    }
    else
    {
        isSingleClick = true;
    }
}

let timer = Date.now();
function loop()
{
    deltaTime = (Date.now() - timer) * 0.001;
    timer = Date.now();

    clearScreen();

    handleInput();

    updateObjects(gameObjects);
    checkCollision(gameObjects);
    drawObjects(gameObjects);

    pixelsToScreen();
    document.getElementById("screen").innerHTML = screenOutput;
    setTimeout(loop, 0);
}
loop();
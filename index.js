var deltaTime = 0;
let isSingleClickFire = true;
let isSingleClickSpawn = true;
let projectileCount = 0;
let enemyCount = 0;
function handleInput()
{
    if (player.input.fire)
    {
        if (isSingleClickFire)
        {
            console.log("single click detected!");
            
            let player = GameObject.getObjectByTag("player");
            if (player == null)
            {

            }
            else
            {
                let distance = 13;
                let name = "projectile" + String(projectileCount++);
                gameObjects[name] = Projectile.instanciate(projectile);
                gameObjects[name].position = player.getRealSprite().findCenter();
                gameObjects[name].position.x += Math.cos((player.rotation) * DEG_TO_RADIANS) * distance;
                gameObjects[name].position.y += Math.sin((player.rotation) * DEG_TO_RADIANS) * distance;

                let projectileSpeed = 2 * Math.random();
                gameObjects[name].xSpeed = Math.cos((player.rotation) * DEG_TO_RADIANS) * projectileSpeed;
                gameObjects[name].ySpeed = Math.sin((player.rotation) * DEG_TO_RADIANS) * projectileSpeed;
            }
            isSingleClickFire = false;
        }
    }
    else
    {
        isSingleClickFire = true;
    }

    
    if (player.input.spawn)
    {
        if (isSingleClickSpawn)
        {
            let name = "enemy" + String(enemyCount++);
            gameObjects[name] = Enemy.instanciate(enemy);
            gameObjects[name].position = {x: pixelWidth * coordPerPixel * Math.random(), y: pixelHeight * coordPerPixel * Math.random()};

            isSingleClickSpawn = false;
        }
    }
    else
    {
        isSingleClickSpawn = true;
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
    
    let hp = gameObjects["rocket"].hp;
    screenOutput = String(Math.floor(hp / 10)) + screenOutput.substring(1);
    screenOutput = screenOutput.substring(0, 1) + String(Math.floor(hp % 10)) + screenOutput.substring(2);
    screenOutput = screenOutput.substring(0, 2) + String(Math.floor(hp * 10 % 10)) + screenOutput.substring(3);
    document.getElementById("screen").innerHTML = screenOutput;
    setTimeout(loop, 0);
}
loop();
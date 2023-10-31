var gameObjects = {};

gameObjects["border-up"] = new Border(new Collider([0, -10, pixelWidth * coordPerPixel, 0], {x:0, y:0}, 1), null);
gameObjects["border-down"] = new Border(new Collider([0, pixelHeight * coordPerPixel,   pixelWidth * coordPerPixel, pixelHeight * coordPerPixel + 10], {x:0, y:0}, 1), null);
gameObjects["border-left"] = new Border(new Collider([-10, 0,    0, pixelHeight * coordPerPixel], {x:0, y:0}, 1), null);
gameObjects["border-right"] = new Border(new Collider([pixelWidth * coordPerPixel, 0,    pixelWidth * coordPerPixel, pixelHeight * coordPerPixel + 10], {x:0, y:0}, 1), null);

gameObjects["rocket"] = new Rocket(
    new Collider([-1, -1, 1, 1], {x: 0, y:0}, 6),
    new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x:0, y:0}, 2.9, 0)
);
gameObjects["rocket"].position = Object.create(center);
gameObjects["rocket"].position.y += 10;
gameObjects["rocket"].scale = 0.7;
gameObjects["rocket"].forwardMovement = new SmoothMovement(50, 750, 1500);
gameObjects["rocket"].backwardsMovement = new SmoothMovement(25, 750, 1800);
gameObjects["rocket"].rotationSpeed = 90;
let projectile = new Projectile(
    new Collider([-1, -1, 1, 1], {x:0, y:0}, 2.5),
    new Sprite([0.5,0, 0,0.87, 1,0.87], {x:0, y:0}, 5, 0)
)
projectile.position = {x: center.x, y: center.y};
projectile.scale = 1;
projectile.xSpeed = 0.3;
projectile.ySpeed = 0.2;

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
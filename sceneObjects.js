var gameObjects = {};

//Barriers
gameObjects["border-up"] = new Border(new Collider([0, -10, pixelWidth * coordPerPixel, 0], {x:0, y:0}, 1), null);
gameObjects["border-down"] = new Border(new Collider([0, pixelHeight * coordPerPixel,   pixelWidth * coordPerPixel, pixelHeight * coordPerPixel + 10], {x:0, y:0}, 1), null);
gameObjects["border-left"] = new Border(new Collider([-10, 0,    0, pixelHeight * coordPerPixel], {x:0, y:0}, 1), null);
gameObjects["border-right"] = new Border(new Collider([pixelWidth * coordPerPixel, 0,    pixelWidth * coordPerPixel, pixelHeight * coordPerPixel + 10], {x:0, y:0}, 1), null);
//Player
gameObjects["rocket"] = new Rocket(
    new Collider([-1, -1, 1, 1], {x: 0, y:0}, 6),
    new Sprite([0,2, 0.5,1, 0.5,2,     0,0, 0.5,0, 0.5,1,      0.5,0, 3,0, 0.5,2,      3,0, 3,2, 0.5,2,  3,0, 4,1, 3,2], {x:0, y:0}, 2.9, 0),
    10
);
gameObjects["rocket"].position = Object.create(center);
gameObjects["rocket"].position.y += 10;
gameObjects["rocket"].scale = 1;
gameObjects["rocket"].forwardMovement = new SmoothMovement(50, 750, 1500);
gameObjects["rocket"].backwardsMovement = new SmoothMovement(25, 750, 1800);
gameObjects["rocket"].rotationSpeed = 90;
//ProjectilePrefab
let projectile = new Projectile(
    new Collider([-1, -1, 1, 1], {x:0, y:0}, 2.5),
    new Sprite([0.5,0, 0,0.87, 1,0.87], {x:0, y:0}, 5, 0),
    2.5
)
projectile.position = {x: center.x, y: center.y};
projectile.scale = 1;
projectile.xSpeed = 0.3;
projectile.ySpeed = 0.2;
//EnemyPrefab
let enemy = new Enemy(
    new Collider([-1, -1, 1, 1], {x:0, y:0}, 1),
    new Sprite([0,4, 1,3.5, 1,1,    1,3.5, 1,1, 2,1,    1,1, 2,0, 4,0,    1,1, 4,0, 5,1,    4,1, 5,1, 6,4,   4,1, 6,4, 5,3.5,   2,1, 2.5,2, 4,1,    2.5,2, 4,1, 3.5,2,  2.5,2, 3.5,2, 3,2.25], {x:0, y:0}, 1, 90),
    5
);
enemy.position = Object.create(center);
enemy.scale = 3;
enemy.rotationSpeed = 50;
enemy.forwardMovement = new SmoothMovement(30, 750, 1300);

gameObjects["enemy0"] = Enemy.instanciate(enemy);
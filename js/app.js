
// TODO: Convert x,y to col,row with function???
// TODO: Tie in intersects() for collision detection
// TODO: reset() to start over
// TODO: gameover() detect win/loss and post alert()

// http://stackoverflow.com/questions/8017541/javascript-canvas-collision-detection
// returns true if there is any overlap
// params: x,y,w,h of two rectangles
function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (w2 !== Infinity && w1 !== Infinity) {
        w2 += x2;
        w1 += x1;
        if (isNaN(w1) || isNaN(w2) || x2 > w1 || x1 > w2) return false;
    }
    if (y2 !== Infinity && h1 !== Infinity) {
        h2 += y2;
        h1 += y1;
        if (isNaN(h1) || isNaN(y2) || y2 > h1 || y1 > h2) return false;
    }
    return true;
}


function checkCollisions(){
    allEnemies.forEach(function(e, index, array){
        if (intersects(e.x, e.y, e.w, 10, player.x, player.y, player.w, 10)) {
            alert("You Loose!");
            location.reload();
        }
    });
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.w = 75;
    this.h = 170;
    this.speed = getRandomInt(150, 600);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x = this.x + (this.speed * dt);
    }else{
        this.x = -100;
        this.speed = getRandomInt(150, 600);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.w = 75;
    this.h = 170;
}

Player.prototype.update = function(dt) {
    // col 5 row 6
    if (this.x <= 0) this.x = 0;
    if (this.x >= 404) this.x = (4 * 101);
    if (this.y <= 0) {
        alert("You Won!");
        location.reload();
    }
    if (this.y >= 400) this.y = (5 * 83);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(k) {
    var xMoveAmount = 101;
    var yMoveAmount = 83;
    // http://stackoverflow.com/questions/6513585/javascript-or-expression-in-a-switch-case
    switch(k)
    {
        case "left":
            this.x = this.x - xMoveAmount;
            break;
        case "right":
            this.x = this.x + xMoveAmount;
            break;
        case "up":
            this.y = this.y - yMoveAmount;
            break;
        case "down":
            this.y = this.y + yMoveAmount;
            break;
    }
}

// define the enemy rows y value
var row = new Array(0, 83, 166, 249, 332, 415);

// Now instantiate your objects.
var en1 = new Enemy(getRandomInt(0,400),row[1]);
var en2 = new Enemy(getRandomInt(-100,200),row[2]);
var en3 = new Enemy(getRandomInt(100,400),row[3]);

// Place all enemy objects in an array called allEnemies
var allEnemies = [en1, en2, en3];

// Place the player object in a variable called player
var player = new Player((2*101), (4*83));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

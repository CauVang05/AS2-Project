let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let movEnableDirection = {UP:true, DOWN:true, LEFT:true, RIGHT:true};

let startEnable = false;
let playerStatus = null; //player's status: ALIVE, DEAD, UPLEVEL, GAMEOVER

let totalPoint = 0; //default is 0
const dotPoint = 1; //able to modify


let playerTop = 0;
let playerLeft = 0;
const step = 1;

const main = document.querySelector('main');
const startButton = document.querySelector('.start');
const scoreUpdating = document.querySelector('.score > p');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}

//Game operation
function startGame(){
    startEnable = true;
    playerStatus = "ALIVE";
    startButton.style.display = 'none';
} 

function levelUp(){
    startEnable = false;
    playerStatus = 'UPLEVEL';
    startButton.style.display = 'flex';
    console.log('UP level');
}

// async function setPosition() {
//     await new Promise(resolve => setTimeout(resolve, 100));
//     playerTop = 0;
//     playerLeft = 0;
//     console.log('UP level');
// }

function collectPoint(collected){
    if(collected){
        totalPoint += dotPoint;
        scoreUpdating.textContent = totalPoint;
    }
}

//Player movement
const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');

function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        movDirection = "UP";
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        movDirection = "DOWN";
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        movDirection = "LEFT";
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        movDirection = "RIGHT";
        rightPressed = true;
    }
}

function checkingCollision(direction, __step){
    const walls = document.querySelectorAll('.wall');
    const enemies = document.querySelectorAll('.enemy');
    const points = document.querySelectorAll('.point');
    const pacmanRect = player.getBoundingClientRect();

    let pacmanLeft = pacmanRect.left - __step;
    let pacmanRight = pacmanRect.right + __step;
    let pacmanBottom = pacmanRect.bottom + __step;
    let pacmanTop = pacmanRect.top - __step;

    let __hitWall = false;
    let __hitGhost = false;
    let __hitPoint = false;

    // Check collision with point
    let __pointLeft = 0;
    points.forEach(point => {
        const pointRect = point.getBoundingClientRect();

        if(point.classList.contains('point')) {
            __pointLeft++;
        }

        if(
        pacmanRect.right > pointRect.left &&
        pacmanRect.left < pointRect.right &&
        pacmanRect.bottom > pointRect.top &&
        pacmanRect.top < pointRect.bottom
        ){
            // Collision detected
            __hitPoint = true;
            point.className = 'collected';
            collectPoint(__hitPoint);
        }
    });
    if(__pointLeft == 0){ //level up incresing difficulty
        levelUp();
    }

    // Check collision with wall (next step depended on direction)
    walls.forEach(wall => {
        const wallRect = wall.getBoundingClientRect();
        switch (direction){
            case "DOWN": 
                if( pacmanBottom > wallRect.top && 
                    pacmanRect.left < wallRect.right &&
                    pacmanRect.right > wallRect.left &&
                    pacmanRect.top < wallRect.bottom)
                {
                    __hitWall = true;
                    movEnableDirection[direction] = false;
                    // console.log(movEnableDirection);
                }
                break;
            
            case "UP":
                if(pacmanRect.left < wallRect.right &&
                    pacmanRect.right > wallRect.left &&
                    pacmanTop < wallRect.bottom &&
                    pacmanRect.bottom > wallRect.top)
                {
                    __hitWall = true;
                    movEnableDirection[direction] = false;
                    // console.log(movEnableDirection);
                }
                break;
            
            case "LEFT":
                if(pacmanLeft < wallRect.right &&
                    pacmanRect.right > wallRect.left &&
                    pacmanRect.top < wallRect.bottom &&
                    pacmanRect.bottom > wallRect.top)
                {
                    __hitWall = true;
                    movEnableDirection[direction] = false;
                    // console.log(movEnableDirection);
                }
                break;
            
            case "RIGHT":
                if(pacmanRect.left < wallRect.right &&
                    pacmanRight > wallRect.left &&
                    pacmanRect.top < wallRect.bottom &&
                    pacmanRect.bottom > wallRect.top)
                {
                    __hitWall = true;
                    movEnableDirection[direction] = false;
                    // console.log(movEnableDirection);
                }
                break;
        }
    });
    if(!__hitWall){ //set to default value if there's no collision
        movEnableDirection.DOWN = true;
        movEnableDirection.UP = true;
        movEnableDirection.LEFT = true;
        movEnableDirection.RIGHT = true;
    }

    // Check collision with enemy
    enemies.forEach(enemy => {
        const enemyRect = enemy.getBoundingClientRect();
        if(
        pacmanRect.right > enemyRect.left &&
        pacmanRect.left < enemyRect.right &&
        pacmanRect.bottom > enemyRect.top &&
        pacmanRect.top < enemyRect.bottom
        ){
            // Collision detected
            __hitGhost = true;
        }
    });

    return {"point":__hitPoint,"wall":__hitWall,"ghost":__hitGhost};
}

let checkValues;

setInterval(function() {
    if(startEnable){
        if(downPressed) {
            checkValues = checkingCollision("DOWN",step);
            if(movEnableDirection["DOWN"]){ 
                playerTop += step;
            }else{
                playerTop -= 1; //auto set position of pacman inside the maze
            }
            player.style.top = playerTop + 'px';
            playerMouth.classList = 'down';
            // console.log(movEnableDirection);
        }
        else if(upPressed) {
            checkValues = checkingCollision("UP",step);
            if(movEnableDirection["UP"]){ 
                playerTop -= step;
            }else{
                playerTop += 1; //auto set position of pacman inside the maze
            }
            player.style.top = playerTop + 'px';        
            playerMouth.classList = 'up';
            // console.log(movEnableDirection);
        }
        else if(leftPressed) {
            checkValues = checkingCollision("LEFT",step);
            if(movEnableDirection["LEFT"]){ 
                playerLeft -= step;
            }else{
                playerLeft += 1; //auto set position of pacman inside the maze
            }
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'left';
            // console.log(movEnableDirection);
        }
        else if(rightPressed) {
            checkValues = checkingCollision("RIGHT",step);
            if(movEnableDirection["RIGHT"]){ 
                playerLeft += step;
            }else{
                playerLeft -= 1; //auto set position of pacman inside the maze
            }
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'right';
            // console.log(movEnableDirection);
        }
    }else{
        playerTop = 0;
        playerLeft = 0;
        player.style.left = playerLeft + 'px';
        player.style.top = playerTop + 'px';        
    }
}, 5);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
startButton.addEventListener('click',startGame);
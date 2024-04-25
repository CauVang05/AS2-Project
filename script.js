
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let movEnableDirection = {UP:true, DOWN:true, LEFT:true, RIGHT:true};

let movementEnable = false;
let gameStatus = "NEWGAME"; //player's status: ALIVE, DEAD, UPLEVEL, GAMEOVER
const wallProbability = 0.3; //30% spawn wall

let totalPoint = 0; //default is 0
const dotPoint = 1; //able to modify
let lives = 3;
let enemyNums = 3;

let playerTop = 0;
let playerLeft = 0;
const step = 1;

const main = document.querySelector('main');
const startButton = document.querySelector('.start');
const statusName = startButton.querySelector('h1');
const scoreUpdating = document.querySelector('.score > p');

const playerLives = document.querySelector('.lives > ul');

const touchDown = document.getElementById('dbttn');
const touchUp = document.getElementById('ubttn');
const touchLeft = document.getElementById('lbttn');
const touchRight = document.getElementById('rbttn');
const touchButtons = {DOWN : touchDown, UP : touchUp, LEFT : touchLeft, RIGHT : touchRight};

let currentTypeCtrl = 0; //0: null || 1: arrow key || 2: buttons 
let hitGhostDetection = false;

// let maze =  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//                 [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
//                 [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//                 [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
//                 [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//                 [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
//                 [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//                 [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
//                 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

const mazeInit = new Maze(10,10,enemyNums);

//Player = 2, Wall = 1, Enemy = 3, Point = 0

//Populates the maze in the HTML
function mazeGenerator(maze){
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
}

//Clear current maze and generate new maze
function clearMaze(){
    main.innerHTML = ''; // Clear previous maze
    //maze = randomMaze();
    mazeGenerator(maze);
    player = document.querySelector('#player');
    playerMouth = player.querySelector('.mouth');
}

let maze = mazeInit.randomMaze();
mazeGenerator(maze);

//Game operation
function startGame(){
    gameAction(gameStatus);
} 

function collectPoint(collected){
    if(collected){
        totalPoint += dotPoint;
        scoreUpdating.textContent = totalPoint;
    }
}

function gameAction(status){
    switch (status){
        case "NEWGAME":
            movementEnable = true;
            gameStatus = "ALIVE";
            if(lives == 0){
                lives = 3;
                clearMaze();
                player.classList.remove("dead");
                player.style.transform = "scale(1)";
                for (let i = 0; i<lives; i++){
                    playerLives.children[i].style.opacity = "100%";
                }
            }
            totalPoint = 0;
            scoreUpdating.textContent = totalPoint;
            startButton.style.display = 'none';
            break;

        case "ALIVE": //player move to another maze
            movementEnable = true;
            playerTop = 0;
            playerLeft = 0;
            player.style.left = playerLeft + 'px';
            player.style.top = playerTop + 'px';  
            startButton.style.display = 'none';
            mazeInit.changeNumsEnemy(enemyNums);
            maze = mazeInit.randomMaze();
            clearMaze();
            break;

        case "DEAD":
            movementEnable = false;
            player.classList.add("hit");
            setTimeout(function trigger (){
            movementEnable = true;
            gameStatus = "ALIVE";
            player.classList.remove("hit");},1500);
            setTimeout(function trigger(){hitGhostDetection = false;},3000);
            break;

        case "GAMEOVER":
            movementEnable = false;
            player.classList.add("dead");
            setTimeout(function trigger(){
            gameStatus = "NEWGAME";
            hitGhostDetection = false;
            enemyNums = 3;
            startButton.style.display = 'flex';
            playerTop = 0;
            playerLeft = 0;
            player.style.left = playerLeft + 'px';
            player.style.top = playerTop + 'px';  
            statusName.textContent = 'Game Over, restart a new game?';},1500);
            break;

        case "UPLEVEL":
            movementEnable = false;
            gameStatus = 'ALIVE';
            startButton.style.display = 'flex';
            if(enemyNums < 5){
                enemyNums++;
            }
            statusName.textContent = 'Continue new level';  
            break;
    }
}

function hitGhost(){
    lives--;
    if(lives == 0){
        gameStatus = "GAMEOVER";
    }else{
        gameStatus = "DEAD"; 
    }
    playerLives.children[lives].style.opacity = "0%";
    gameAction(gameStatus);
}


// for(let butt in touchButtons){
//     touchButtons[butt].addEventListener('mousedown',function(){
//         buttonDown(butt);
//     });
//     touchButtons[butt].addEventListener('mouseup',function(){
//         buttonUp(butt);
//     });
// }

// document.addEventListener('keydown', keyDown);
// document.addEventListener('keyup', keyUp);

initEventListener();

function buttonUp(__direction){
    if(currentTypeCtrl == 2){
        currentTypeCtrl = 0;
        switch(__direction){
            case "UP":
                upPressed = false;
                break;
            
            case "DOWN":
                downPressed = false;
                break;
            
            case "LEFT":
                leftPressed = false;
                break;
            
            case "RIGHT":
                rightPressed = false;
                break;
        }
        // console.log('Button ' + __direction + ' released');
    }
}

function buttonDown(__direction){
    if(currentTypeCtrl == 0){
        currentTypeCtrl = 2;
        switch(__direction){
            case "UP":
                upPressed = true;
                break;
            
            case "DOWN":
                downPressed = true;
                break;
            
            case "LEFT":
                leftPressed = true;
                break;
            
            case "RIGHT":
                rightPressed = true;
                break;
        }
        // console.log('Button ' + __direction + ' pressed');
    }
}

function keyUp() {
    if(currentTypeCtrl == 1){
        currentTypeCtrl = 0;
        upPressed = false;
        downPressed = false;
        leftPressed = false;
        rightPressed = false;
    }
}

function keyDown(event) {
    console.log(event);
    if(currentTypeCtrl == 0){
        currentTypeCtrl = 1;
        if (event.key === 'ArrowUp') {
            upPressed = true;
        } else if (event.key === 'ArrowDown') {
            downPressed = true;
        } else if (event.key === 'ArrowLeft') {
            leftPressed = true;
        } else if (event.key === 'ArrowRight') {
            rightPressed = true;
        }
    }
}
//Player movement

let player = document.querySelector('#player');
let playerMouth = player.querySelector('.mouth');

function playerCollisionDetection(direction, __step){
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
            point.classList.remove('point');
            collectPoint(__hitPoint);
        }
    });

    if(__pointLeft == 0){ //level up incresing difficulty
        gameStatus = "UPLEVEL";
        gameAction(gameStatus);
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
            if(hitGhostDetection == false){
                hitGhostDetection = true;
                hitGhost();
            }
        }
    });

    return {"point":__hitPoint,"wall":__hitWall,"ghost":__hitGhost};
}

let checkValues;

function movementAction(){
    if(movementEnable){
        if(downPressed) {
            checkValues = playerCollisionDetection("DOWN",step);
            if(movEnableDirection["DOWN"]){ 
                playerTop += step;
            }else{
                playerTop -= 0; //auto set position of pacman inside the maze
            }
            player.style.top = playerTop + 'px';
            playerMouth.classList = 'down';
            // console.log(movEnableDirection);
        }
        else if(upPressed) {
            checkValues = playerCollisionDetection("UP",step);
            if(movEnableDirection["UP"]){ 
                playerTop -= step;
            }else{
                playerTop += 0; //auto set position of pacman inside the maze
            }
            player.style.top = playerTop + 'px';        
            playerMouth.classList = 'up';
            // console.log(movEnableDirection);
        }
        else if(leftPressed) {
            checkValues = playerCollisionDetection("LEFT",step);
            if(movEnableDirection["LEFT"]){ 
                playerLeft -= step;
            }else{
                playerLeft += 0; //auto set position of pacman inside the maze
            }
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'left';
            // console.log(movEnableDirection);
        }
        else if(rightPressed) {
            checkValues = playerCollisionDetection("RIGHT",step);
            if(movEnableDirection["RIGHT"]){ 
                playerLeft += step;
            }else{
                playerLeft -= 0; //auto set position of pacman inside the maze
            }
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'right';
            // console.log(movEnableDirection);
        }
    }
}

setInterval(function() {
    movementAction();
}, 5);


function initEventListener(){
    for(let butt in touchButtons){
        touchButtons[butt].addEventListener('mousedown',function(){
            buttonDown(butt);
        });
        touchButtons[butt].addEventListener('mouseup',function(){
            buttonUp(butt);
        });
    }

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    startButton.addEventListener('click',startGame);
}
class GhostMovement{
    constructor() {
        this.step = 100;
        this.posX = 0;
        this.posY = 0;
        this.direction = null;
        this.lastDirect = null;
    }

    move(ghost){
        const ghostReact = ghost.getBoundingClientRect();
        
    }

    __updateLastDirection(preDirect){
        this.lastDirect = preDirect;
    }

    __lastDirection(){
        return this.lastDirect;
    }

    __updateDriection(newDirect){
        this.direction = newDirect;
    }

    __moveDirection(){
        return this.direction;
    }

    __checkCurrentPosition(ghostReact, direction){
        let ghostLeft = ghostReact.left - 1;
        let ghostRight = ghostReact.right + 1;
        let ghostBottom = ghostReact.bottom + 1;
        let ghostTop = ghostReact.top - 1;
        const walls = document.querySelectorAll('.wall');
        let result = true;

        walls.forEach(wall => {
            const wallRect = wall.getBoundingClientRect();
            switch (direction){
                case "DOWN": 
                    if( ghostBottom > wallRect.top && 
                        ghostReact.left < wallRect.right &&
                        ghostReact.right > wallRect.left &&
                        ghostReact.top < wallRect.bottom)
                    {
                        result = false;
                    }
                    break;
                
                case "UP":
                    if(ghostReact.left < wallRect.right &&
                        ghostReact.right > wallRect.left &&
                        ghostTop < wallRect.bottom &&
                        ghostReact.bottom > wallRect.top)
                    {
                        result = false;
                    }
                    break;
                
                case "LEFT":
                    if(ghostLeft < wallRect.right &&
                        ghostReact.right > wallRect.left &&
                        ghostReact.top < wallRect.bottom &&
                        ghostReact.bottom > wallRect.top)
                    {                        
                        result = false;
                    }
                    break;
                
                case "RIGHT":
                    if(ghostReact.left < wallRect.right &&
                        ghostRight > wallRect.left &&
                        ghostReact.top < wallRect.bottom &&
                        ghostReact.bottom > wallRect.top)
                    {
                        result = false;
                    }
                    break;
            }
        });
        return result;
    }

    potentialMovement(ghostReact){
        let ghostLeft = ghostReact.left - this.step;
        let ghostRight = ghostReact.right + this.step;
        let ghostBottom = ghostReact.bottom + this.step;
        let ghostTop = ghostReact.top - this.step;
        const directions = ["DOWN","UP","LEFT","RIGHT"];
        let ways = ["DOWN","UP","LEFT","RIGHT"];
        const walls = document.querySelectorAll('.wall');
        walls.forEach(wall => {
            const wallRect = wall.getBoundingClientRect();
            for(let i of directions){
                switch (i){
                    case "DOWN": 
                        if( ghostBottom > wallRect.top && 
                            ghostReact.left < wallRect.right &&
                            ghostReact.right > wallRect.left &&
                            ghostReact.top < wallRect.bottom)
                        {
                            ways.splice('DOWN',1);
                        }
                        break;
                    
                    case "UP":
                        if(ghostReact.left < wallRect.right &&
                            ghostReact.right > wallRect.left &&
                            ghostTop < wallRect.bottom &&
                            ghostReact.bottom > wallRect.top)
                        {
                            ways.splice('UP',1);
                        }
                        break;
                    
                    case "LEFT":
                        if(ghostLeft < wallRect.right &&
                            ghostReact.right > wallRect.left &&
                            ghostReact.top < wallRect.bottom &&
                            ghostReact.bottom > wallRect.top)
                        {                        
                            ways.splice('LEFT',1);
                        }
                        break;
                    
                    case "RIGHT":
                        if(ghostReact.left < wallRect.right &&
                            ghostRight > wallRect.left &&
                            ghostReact.top < wallRect.bottom &&
                            ghostReact.bottom > wallRect.top)
                        {
                            ways.splice('RIGHT',1);
                        }
                        break;
                }
            }
        });

        return ways;
    }

    randomDirection(directions){
        let nextDirection = directions[Math.floor(Math.random()*directions.length)];
        return nextDirection;
    }

    curentPosition(){
        return [this.posX, this.posY];
    }

    updatePosition(ghost, direction){
        switch (direction){
            case "DOWN": 
                this.posY += 1;
                ghost.style.top = this.posY + 'px';
                break;
            
            case "UP":
                this.posY -= 1;
                ghost.style.top = this.posY + 'px';
                break;
            
            case "LEFT":
                this.posX -= 1;
                ghost.style.left = this.posX + 'px';
                break;
            
            case "RIGHT":
                this.posX += 1;
                ghost.style.left = this.posX + 'px';
                break;
        }
    }
}   

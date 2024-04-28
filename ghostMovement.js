class GhostMovement{
    constructor() {
        this.step = 60;
        this.posX = 0;
        this.posY = 0;
        this.direction = null;
        this.hitWall = false;
    }

    move(ghost){
        const ghostReact = ghost.getBoundingClientRect();
        let nextDirection = this.__moveDirection();
        let potsMove = ["DOWN","UP","LEFT","RIGHT"];

        if(this.direction == null || this.hitWall == true){
            nextDirection = this.randomDirection(potsMove);
            this.__updateDriection(nextDirection);
        }   
        if(this.__checkCurrentPosition(ghostReact, nextDirection)){
            this.updatePosition(ghost,nextDirection);
        }
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
        this.hitWall = !result;
        return result;
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

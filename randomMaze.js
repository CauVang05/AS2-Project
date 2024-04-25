class Maze {
    constructor(x,y,enemyNums) {
        this.x = x;
        this.y = y;
        this.enemyNums = enemyNums;
    }
  
    changeNumsEnemy(enemy){
        this.enemyNums = enemy;
    }

    randomMaze(){ //TODO: debug after finished almost essential requirements
        // Establish letiables and starting grid
        let totalCells = this.x*this.y;
        let unvis = new Array();
        let maze = new Array();
    
        for (let i = 0; i < this.y; i++) {
            unvis[i] = new Array();
            maze[i] = new Array();
            for (let j = 0; j < this.x; j++) {
                if(i == 0 || i == (this.y-1) || j == 0 || j == (this.x-1)){
                    unvis[i][j] = false;
                    maze[i][j] = 1;
                }else if (i == 1 && j == 1){
                    unvis[i][j] = false;
                    maze[i][j] = 2;
                }else{
                    unvis[i][j] = true;
                    maze[i][j] = 0;
                }
            }
        }
    
        // // Set a random position to start from
        // let currentCell = [Math.floor(Math.random()*this.y), Math.floor(Math.random()*this.x)];
        // let saveCellChecked = [currentCell];
        // maze[currentCell[0]][currentCell[1]] = 1;
        // unvis[currentCell[0]][currentCell[1]] = false;
        // let visited = 1;
        
        // // Loop through all available cell positions
        // while (visited < totalCells) {
        //     let pot = [[currentCell[0]-1, currentCell[1]],
        //                     [currentCell[0], currentCell[1]+1],
        //                     [currentCell[0]+1, currentCell[1]],
        //                     [currentCell[0], currentCell[1]-1]];
        //     let neighbors = new Array();
        //     for(let l=0;l<4;l++){
        //         if(pot[l][0] > -1 &&
        //           pot[l][0] < this.y &&
        //           pot[l][1] > -1 &&
        //           pot[l][1] < this.x &&
        //           unvis[pot[l][0]][pot[l][1]])
        //         {
        //             neighbors.push(pot[l]);
        //         }
        //     }
            
        //     if (neighbors.length){
        //         nextPosition = neighbors[Math.floor(Math.random()*neighbors.length)];
        //         maze[nextPosition[0]][nextPosition[1]] = 1;
        //         unvis[nextPosition[0]][nextPosition[1]] = false;
        //         currentCell = nextPosition;
        //         saveCellChecked.push(currentCell);
        //         visited++;
        //     }else{
        //         currentCell = saveCellChecked.pop();
        //     }
        // }
        
        maze = this.__randomEnemyPos(maze);        
        return maze;
    }

    __randomEnemyPos(maze){
        let newMaze = maze;
        let availablePos = new Array();
        let enemyCount = 0;
        for(let i = 0; i < this.y; i++){
            for(let j = 0; j < this.x; j++){
                if(newMaze[i][j] == 0){
                    availablePos.push([i,j]);
                }
            }
        }
        while(enemyCount < this.enemyNums){
            let position = availablePos[Math.floor(Math.random()*availablePos.length)];
            newMaze[position[0]][position[1]] = 3;
            enemyCount++;
        }
        return newMaze;
    }

}


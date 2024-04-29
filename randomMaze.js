class Maze {
    constructor(x,y,enemyNums) {
        this.x = x;
        this.y = y;
        this.enemyNums = enemyNums;
    }
  
    changeNumsEnemy(enemy){
        this.enemyNums = enemy;
    }

    randomMaze(){
        // let totalCells = this.x*this.y;
        let cellChecker = new Array();
        let maze = new Array();
        let potCells = new Array();
    
        for (let i = 0; i < this.y; i++) {
            cellChecker[i] = new Array();
            maze[i] = new Array();
            for (let j = 0; j < this.x; j++) {
                if(i == 0 || i == (this.y-1) || j == 0 || j == (this.x-1)){
                    cellChecker[i][j] = false;
                    maze[i][j] = 1;
                }else if (i == 1 && j == 1){
                    cellChecker[i][j] = false;
                    maze[i][j] = 2;
                }else{
                    cellChecker[i][j] = true;
                    maze[i][j] = 1;
                }
            }
        }
    
        // Set a random position to start from
        let currentCell = [Math.floor(Math.random()*this.y), Math.floor(Math.random()*this.x)];
        let removedCell = [0, 0];
        let chosenCellNum = 0;

        while(cellChecker[currentCell[0]][currentCell[1]] != true){
            currentCell = [Math.floor(Math.random()*this.y), Math.floor(Math.random()*this.x)];
        }
        maze[currentCell[0]][currentCell[1]] = 0;
        cellChecker[currentCell[0]][currentCell[1]] = false;
        let neighbours = [[[currentCell[0]-2, currentCell[1]], [currentCell[0]-1, currentCell[1]]], //TOP  || the 3th & 4th arguments is the cell next to the predicted cell
                        [[currentCell[0], currentCell[1]+2], [currentCell[0], currentCell[1]+1]], //RIGHT  || the 3th & 4th arguments is the cell next to the predicted cell
                        [[currentCell[0]+2, currentCell[1]], [currentCell[0]+1, currentCell[1]]], //BOTTOM || the 3th & 4th arguments is the cell next to the predicted cell
                        [[currentCell[0], currentCell[1]-2], [currentCell[0], currentCell[1]-1]]];//LEFT   || the 3th & 4th arguments is the cell next to the predicted cell
        for(let cell of neighbours){
            if (cell[0][0] > -1 &&
                cell[0][0] < this.y &&
                cell[0][1] > -1 &&
                cell[0][1] < this.x &&
                cellChecker[cell[0][0]][cell[0][1]])
            {
                potCells.push(cell);
            }
        }
        chosenCellNum = Math.floor(Math.random()*potCells.length);
        currentCell = potCells[chosenCellNum][0];
        removedCell = potCells[chosenCellNum][1];
        cellChecker = this.__cellChecker(cellChecker,removedCell,currentCell);
        maze = this.__createPath(maze,removedCell,currentCell);
        potCells.splice(chosenCellNum,1);
        // Loop 
        while(0 < potCells.length){
            neighbours = [[[currentCell[0]-2, currentCell[1]], [currentCell[0]-1, currentCell[1]]], //TOP  || the 3th & 4th arguments is the cell next to the predicted cell
                        [[currentCell[0], currentCell[1]+2], [currentCell[0], currentCell[1]+1]], //RIGHT  || the 3th & 4th arguments is the cell next to the predicted cell
                        [[currentCell[0]+2, currentCell[1]], [currentCell[0]+1, currentCell[1]]], //BOTTOM || the 3th & 4th arguments is the cell next to the predicted cell
                        [[currentCell[0], currentCell[1]-2], [currentCell[0], currentCell[1]-1]]];//LEFT   || the 3th & 4th arguments is the cell next to the predicted cell
            for(let c of neighbours){
                if (c[0][0] > -1 &&
                    c[0][0] < this.y &&
                    c[0][1] > -1 &&
                    c[0][1] < this.x &&
                    cellChecker[c[0][0]][c[0][1]])
                {
                    potCells.push(c);
                }
            }
            chosenCellNum = Math.floor(Math.random()*potCells.length);
            currentCell = potCells[chosenCellNum][0];
            removedCell = potCells[chosenCellNum][1];
            cellChecker = this.__cellChecker(cellChecker,removedCell,currentCell);
            maze = this.__createPath(maze,removedCell,currentCell);
            potCells.splice(chosenCellNum,1);
            // console.log(chosenCellNum);
        }
            
        // maze = this.__randomEnemyPos(maze); //TODO: TURN IT BACK AFTER CREATE RANDOM MAZE        
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
            const index = availablePos.indexOf(position);
            availablePos.splice(index, 1); 
            enemyCount++;
        }
        return newMaze;
    }

    __createPath(currentMaze, removedCell, currentCell){
        currentMaze[removedCell[0]][removedCell[1]] = 0;
        currentMaze[currentCell[0]][currentCell[1]] = 0;
        return currentMaze;
    }
    __cellChecker(currentCellChecker, removedCell, currentCell){
        currentCellChecker[removedCell[0]][removedCell[1]] = false;
        currentCellChecker[currentCell[0]][currentCell[1]] = false;
        return currentCellChecker;
    }
}


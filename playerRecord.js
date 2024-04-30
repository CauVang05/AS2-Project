class PlayerRecord{
    constructor() {
        this.name = '';
        this.leaderboard = {};
        this.scoreBoard = document.querySelector('.leaderboard > ol');
    }
    initLeaderboard(){
        const availablePlayer = this.__getAllKeys();
        let temporaryBoard = {};
        for(let i of availablePlayer){
            let previousPoint = localStorage.getItem(i);
            temporaryBoard[i] = parseInt(previousPoint);
        }
        this.leaderboard = this.__sortScore(temporaryBoard);
        // console.log(this.leaderboard);
        this.__displayLeaderboard(this.leaderboard);
    }
    inputName(){
        this.name = prompt('Please enter your name:');
    }
    saveScore(score){
        let currentLeaderboard = this.leaderboard; 
        currentLeaderboard[this.name] = score;
        // console.log(this.leaderboard);
        this.leaderboard = this.__sortScore(currentLeaderboard);
        this.__displayLeaderboard(this.leaderboard);
        localStorage.clear();
        for(let i in this.leaderboard){
            localStorage.setItem(i,this.leaderboard[i].toString());
        }
    }
    __sortScore(leaderboard){ 
        let finalLeaderboard = {};
        let tempororyDict = {};
        let counter = 0;
        const dictLenght = Object.keys(leaderboard).length;
        while(counter < dictLenght){
            let maxNums = null;
            for(let key in leaderboard){
                if(null == maxNums || leaderboard[key] > maxNums){
                    maxNums = leaderboard[key];
                    tempororyDict[counter] = [key,maxNums];
                }
            }
            delete leaderboard[tempororyDict[counter][0]];
            counter++;
        }

        for(let i in tempororyDict){
            if(i < 6){ //6 first top player
                finalLeaderboard[tempororyDict[i][0]] = tempororyDict[i][1];
            }
        }
        
        return finalLeaderboard;
    }

    __getAllKeys() {
        let keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            keys.push(key);
        }
        return keys;
    }

    __displayLeaderboard(leaderboard){
        let count = 0;   
        for (let i in leaderboard){
            let text = `${i}`;
            text = text.padEnd(15,'.');
            text += `${leaderboard[i]}`;
            this.scoreBoard.children[count].textContent = text;
            count++;
        }
    }
}
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
        this.__displayLeaderboard(this.leaderboard);
    }
    inputName(){
        this.name = prompt('Please enter your name:');
    }
    saveScore(score){
        let currentLeaderboard = this.leaderboard; 
        currentLeaderboard[this.name] = score;
        this.leaderboard = this.__sortScore(currentLeaderboard);
        this.__displayLeaderboard(this.leaderboard);
        localStorage.clear();
        for(let i in this.leaderboard){
            localStorage.setItem(i,this.leaderboard[i].toString());
        }
    }
    __sortScore(leaderboard){ //TODO: FIX BUG UPDATE WRONG DATA
        let finalLeaderboard = {};
        let scoreList = [];
        let playerList = [];
        let count = 0;
        for(let i in leaderboard){
            scoreList.push(leaderboard[i]);
        }
        scoreList.sort(function(a, b){return b - a});
        for(let z in leaderboard){
            for(let j of scoreList){
                if(j == leaderboard[z]){
                    playerList.push(z);
                    break;
                }
            }
        }

        if(scoreList.length > 6){
            scoreList.pop();
            playerList.pop();
        }

        while(count < playerList.length){
            finalLeaderboard[playerList[count]] = scoreList[count];
            count++;
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
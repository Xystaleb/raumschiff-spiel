import Scene from "./scene.js";

export default class EndGameScene extends Scene {
    constructor(view,playerOne,playerTwo,boolean){
        super(view);
        this.playerOne = playerOne
        this.playerTwo= playerTwo
        this.singleplayer= boolean
    }

    build(){ 
        // Stoppe das Spiel, z.B. indem du den gameLoop beendest oder den Interval für die Gegnererzeugung stoppst
        // Zeige den Highscore an

        if(this.singleplayer){
               var scoreElement = document.createElement('div');
        scoreElement.className = 'score';
        scoreElement.innerHTML = 'Game Over! Dein Score: ' + this.playerOne.highscore;
        }else{
            var scoreElement = document.createElement('div');
            scoreElement.className = 'score';
            scoreElement.innerHTML = 'Game Over! <br>Player One Score: ' + this.playerOne.highscore + '<br>Player Two Score: ' + this.playerTwo.highscore;
        }
     

        var reloadButton = document.createElement('button');
        reloadButton.textContent = 'New Game!';
        reloadButton.addEventListener('click', function () {
            location.reload();
        });

        scoreElement.appendChild(reloadButton);
        this.components.push(scoreElement);

        super.build();
    }
}
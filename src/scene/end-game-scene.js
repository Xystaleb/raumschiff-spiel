import Scene from "./scene.js";

export default class EndGameScene extends Scene {
    constructor(view){
        super(view);
    }

    build(){ 
        // Stoppe das Spiel, z.B. indem du den gameLoop beendest oder den Interval für die Gegnererzeugung stoppst
        // Zeige den Highscore an
        var scoreElement = document.createElement('div');
        scoreElement.className = 'score';
        scoreElement.innerHTML = 'Game Over! Dein Score: ' + 30;

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
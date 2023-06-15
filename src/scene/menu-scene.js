import Scene from "./scene.js";
import GameScene from "./game-scene.js";

export default class MenuScene extends Scene {

    //Erzeugen der HTMLElemente
    build() {

        super.build();

        const buttonSingleplayer = document.createElement("button");
        buttonSingleplayer.innerText = "Klick mich fuer singleplayer";

        const buttonMultiplayer = document.createElement("button");
        buttonMultiplayer.innerText = "Klick mich fuer singleplayer";

        buttonSingleplayer.addEventListener("click", () => {
            this.startPlaying(true);
        });

        buttonMultiplayer.addEventListener("click", () => {
            this.startPlaying(false);
        });

        this.view.appendChild(buttonSingleplayer);
        this.view.appendChild(buttonMultiplayer);
    }

    startPlaying(boolean) {

        var gameScene = new GameScene(this.view, boolean); // Übergabe welcher button gedrückt wurde
        gameScene.build();
        gameScene.draw();
    }

}
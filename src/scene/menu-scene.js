import Scene from "./scene.js";
import GameScene from "./game-scene.js";

export default class MenuScene extends Scene {
    build() {
        super.build();

        const buttonSingleplayer = document.createElement("button");
        buttonSingleplayer.innerText = "Klick mich für Singleplayer";

        const buttonMultiplayer = document.createElement("button");
        buttonMultiplayer.innerText = "Klick mich für Multiplayer";

        buttonSingleplayer.addEventListener("click", () => {
            this.showNameInput(true);
        });

        buttonMultiplayer.addEventListener("click", () => {
            this.showNameInput(false);
        });

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttons");
        buttonDiv.appendChild(buttonSingleplayer);
        buttonDiv.appendChild(buttonMultiplayer);

        this.view.appendChild(buttonDiv);
    }

    showNameInput(singlePlayer) {
        this.view.innerHTML = ""; // Leert den Inhalt der Szene

        const nameLabel = document.createElement("label");
        nameLabel.innerText = "Name des Spielers:";
        const nameInput = document.createElement("input");

        const submitButton = document.createElement("button");
        submitButton.innerText = "Bestätigen";
        submitButton.addEventListener("click", () => {
            const playerName = nameInput.value || "Spieler"; // Standardname, falls kein Name eingegeben wurde
            this.startPlaying(singlePlayer, playerName, "");
        });

        const nameInputContainer = document.createElement("div");
        nameInputContainer.classList.add("PlayerOneInput");
        nameInputContainer.appendChild(nameLabel);
        nameInputContainer.appendChild(nameInput);
        nameInputContainer.appendChild(submitButton);

        this.view.appendChild(nameInputContainer);

        if (!singlePlayer) {
            const secondNameLabel = document.createElement("label");
            secondNameLabel.innerText = "Name des zweiten Spielers:";
            const secondNameInput = document.createElement("input");

            const secondSubmitButton = document.createElement("button");
            secondSubmitButton.innerText = "Bestätigen";
            secondSubmitButton.addEventListener("click", () => {
                const playerName1 = nameInput.value || "Spieler 1";
                const playerName2 = secondNameInput.value || "Spieler 2";
                this.startPlaying(singlePlayer, playerName1, playerName2);
            });

            const secondNameInputContainer = document.createElement("div");
            secondNameInputContainer.classList.add("PlayerTwoInput");
            secondNameInputContainer.appendChild(secondNameLabel);
            secondNameInputContainer.appendChild(secondNameInput);
            secondNameInputContainer.appendChild(secondSubmitButton);

            this.view.appendChild(secondNameInputContainer);
        }
    }

    startPlaying(singlePlayer, name1, name2) {
        var gameScene = new GameScene(this.view, singlePlayer, name1, name2);
        gameScene.build();
        gameScene.draw();
    }
}

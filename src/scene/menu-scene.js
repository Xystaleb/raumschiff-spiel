import LeaderboardService from "../services/leaderboard-service.js";
import Scene from "./scene.js";
import GameScene from "./game-scene.js";

export default class MenuScene extends Scene {
    constructor(view){
        super(view);
        this.leaderboardService = new LeaderboardService(
            {
                "url": "http://45.133.9.157:3000"
            }
        )
    }

    startPlaying(playerState) {
        var gameScene = new GameScene(this.view, playerState); // Übergabe welcher button gedrückt wurde
        gameScene.build();
        gameScene.draw();
    }

    async build(){
        const buttonSingleplayer = document.createElement("button");
        buttonSingleplayer.innerText = "Klick mich fuer singleplayer";

        const buttonMultiplayer = document.createElement("button");
        buttonMultiplayer.innerText = "Klick mich fuer multiplayer";

        buttonSingleplayer.addEventListener("click", () => {
            this.startPlaying(true);
        });

        buttonMultiplayer.addEventListener("click", () => {
            this.startPlaying(false);
        });

        this.registerComponent(buttonSingleplayer);
        this.registerComponent(buttonMultiplayer);

        let leaderboard_entries = await this.leaderboardService.getLeaderboard()
        this.view.className = "centered";

        let leaderboard = document.createElement("div");
        leaderboard.className = "centered leaderboard main-menu";

        let leaderboard_list = document.createElement("table")
        leaderboard_list.innerHTML =
            `
            <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
            </tr>
            `
        for (const idx in leaderboard_entries) {
            const entry = leaderboard_entries[idx];
            const position = Number.parseInt(idx) + 1;
            leaderboard_list.innerHTML +=
                `
                <tr>
                    <td>${position}</td>
                    <td>${entry.name}</td>
                    <td>${entry.score}</td>
                    <td>${entry.created}</td>
                </tr>
                `
        }

        leaderboard.appendChild(leaderboard_list)

        let main = document.createElement("div");
        let menu = document.createElement("div");
        menu.className = "main-menu";

        let tutorialButton = document.createElement("button");
        tutorialButton.className = "button";
        tutorialButton.innerHTML = "Start Tutorial";

        let levelOneBUtton = document.createElement("button");
        levelOneBUtton.className = "button";
        levelOneBUtton.innerHTML = "Level One Button";

        menu.appendChild(tutorialButton);
        menu.appendChild(levelOneBUtton);
        main.appendChild(menu);

        this.registerComponent(leaderboard);
        this.registerComponent(main);
        super.build();
    }
}
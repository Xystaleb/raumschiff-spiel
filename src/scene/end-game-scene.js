import Leaderboard from '../models/leaderboard.js'
import LeaderboardService from '../services/leaderboard-service.js'
import Scene from './scene.js'

export default class EndGameScene extends Scene {
  constructor(view, playerOne, playerTwo, singleplayer) {
    super(view)
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.singleplayer = singleplayer
  }

  // Erstellt den Endbildschirm des Spiels, zeigt den Highscore an, erstellt einen Eintrag in der Rangliste
  // und ermöglicht es dem Spieler, ein neues Spiel zu starten.
  async build() {
  // Stoppe das Spiel, z.B. indem du den gameLoop beendest oder den Interval für die Generierung von Gegnern stoppst
  // Zeige den Highscore an

    const leaderboardService = new LeaderboardService({
      url: 'http://45.133.9.157:3000'
    })

    let scoreElement = document.createElement('div')
    scoreElement.className = 'score'

    if (this.singleplayer) {
      scoreElement.innerHTML = `Game Over! Dein Score: ${this.playerOne.score}`

      // Insert score
      await leaderboardService.createLeaderboardEntry(this.playerOne.name, this.playerOne.score)
    } else {
      scoreElement.innerHTML = `Game Over! <br>Player One Score: ${this.playerOne.score}<br>Player Two Score: ${this.playerTwo.score}`

      // Insert score
      await leaderboardService.createMultiplayerLeaderboardEntry(this.playerOne.name, this.playerOne.score + this.playerTwo.score)
    }

    const reloadButton = document.createElement('button')
    reloadButton.textContent = 'New Game!'
    reloadButton.addEventListener('click', function () {
      location.reload()
    })

    scoreElement.appendChild(reloadButton)
    this.components.push(scoreElement)

    let entries = [];
    if (this.singleplayer) {
      entries = await leaderboardService.getLeaderboard()
    } else {
      entries = await leaderboardService.getMultiplayerLeaderboard()
    }
    const leaderboard = new Leaderboard(entries)
    leaderboard.build()

    this.registerComponent(leaderboard.element)

    super.build()
  }
}

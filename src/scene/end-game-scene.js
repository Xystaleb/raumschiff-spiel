import Leaderboard from '../models/leaderboard.js'
import LeaderboardService from '../services/leaderboard-service.js'
import Scene from './scene.js'

export default class EndGameScene extends Scene {
  /**
     * This is a constructor function that initializes the view, playerOne, playerTwo, and singleplayer
     * boolean for a game.
     * @param view - It is a reference to the view object that will be used to display the game interface.
     * @param playerOne - It is a variable that represents the first player in the game.
     * @param playerTwo - `playerTwo` is a parameter that represents the second player in the game. It is
     * likely an object that contains information about the player, such as their name, score, and game
     * pieces.
     * @param boolean - The `boolean` parameter is a variable that can hold a value of either `true` or
     * `false`. It is used to determine whether the game is a singleplayer game or a multiplayer game. If
     * the value is `true`, it means the game is a singleplayer game, and if the
     */
  constructor (view, playerOne, playerTwo, boolean) {
    super(view)
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.singleplayer = boolean
  }

  /**
     * The function builds the end game screen, displays the highscore, creates a leaderboard entry, and
     * allows the player to start a new game.
     */
  async build () {
    // Stoppe das Spiel, z.B. indem du den gameLoop beendest oder den Interval für die Gegnererzeugung stoppst
    // Zeige den Highscore an

    const leaderboardService = new LeaderboardService(
      {
        url: 'http://45.133.9.157:3000'
      }
    )

    if (this.singleplayer) {
      var scoreElement = document.createElement('div')
      scoreElement.className = 'score'
      scoreElement.innerHTML = 'Game Over! Dein Score: ' + this.playerOne.score

      // insert score
      await leaderboardService.createLeaderboardEntry(this.playerOne.name, this.playerOne.score)
    } else {
      var scoreElement = document.createElement('div')
      scoreElement.className = 'score'
      scoreElement.innerHTML = 'Game Over! <br>Player One Score: ' + this.playerOne.score + '<br>Player Two Score: ' + this.playerTwo.score

      // insert score
      await leaderboardService.createLeaderboardEntry(this.playerTwo.name, this.playerTwo.score)
    }

    const reloadButton = document.createElement('button')
    reloadButton.textContent = 'New Game!'
    reloadButton.addEventListener('click', function () {
      location.reload()
    })

    scoreElement.appendChild(reloadButton)
    this.components.push(scoreElement)

    const entries = await leaderboardService.getLeaderboard()
    const leaderboard = new Leaderboard(entries)
    leaderboard.build()

    this.registerComponent(leaderboard.element)

    super.build()
  }
}

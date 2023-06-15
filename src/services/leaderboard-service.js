export default class LeaderboardService {
  constructor (config) {
    this.config = config
  }

  async getLeaderboard () {
    const response = await fetch(
      this.config.url + '/leaderboard',
      {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin'
      }
    )

    return response.json()
  }

  /**
    * This function retrieves the multiplayer leaderboard data from a specified URL using the GET method
    * and returns it as a JSON object.
    * @returns The `getMultiplayerLeaderboard()` function is returning a Promise that resolves to the
    * JSON data returned from the specified URL endpoint.
    */
  async getMultiplayerLeaderboard () {
    const response = await fetch(
      this.config.url + '/leaderboard/multiplayer',
      {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin'
      }
    )

    return response.json()
  }

  /**
   * This function creates a new leaderboard entry by sending a POST request to a specified URL with the
   * username and score as JSON data.
   * @param username - The username of the player whose score is being added to the leaderboard.
   * @param score - The `score` parameter is a numerical value representing the score of a user in a game
   * or competition. It is used as a data point to create a leaderboard entry for the user.
   */
  async createLeaderboardEntry (username, score) {
    await fetch(
      this.config.url + '/leaderboard/createentry',
      {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score })
      }
    )
  }
}

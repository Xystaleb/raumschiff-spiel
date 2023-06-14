export default class LeaderboardService {
  constructor(config) {
    this.config = config;
  }

  async getLeaderboard() {
    try {
      const response = await fetch(
        this.config.url + "/leaderboard",
        {
          method: "GET",
          mode: "cors", // no-cors, *cors, same-origin
          credentials: "same-origin"
        }
      );

      return response.json();
    } catch (error) {
      console.log(error)
    }
    return [];
  }

  async createLeaderboardEntry(username, score) {
    const response = await fetch(
      this.config.url + "/leaderboard/createentry",
      {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "score": score })
      }
    );
  }
}
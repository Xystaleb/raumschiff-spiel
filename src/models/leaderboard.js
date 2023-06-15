export default class Leaderboard {
  constructor(entries) {
    this.element = undefined
    this.entries = entries
    this.columns = [
      'Name',
      'Score',
      'Date'
    ]
  }

  // Erstellt eine Rangliste-Tabelle mit Spalten und Zeilen basierend auf den übergebenen Einträgen.
  build() {
    const leaderboard = document.createElement('div')
    leaderboard.className = 'leaderboard'
    const table = document.createElement('table')

    // Spalten generieren
    const col_row = document.createElement('tr')
    for (const col of this.columns) {
      const th = document.createElement('th')
      th.innerHTML = col
      col_row.appendChild(th)
    }
    table.appendChild(col_row)

    // Zeilen generieren basierend auf den Einträgen in this.entries
    for (const entry of this.entries) {
      const row = document.createElement('tr')

      const name = document.createElement('td')
      name.innerHTML = entry.name

      const score = document.createElement('td')
      score.innerHTML = entry.score

      const date = document.createElement('td')
      date.innerHTML = entry.created

      row.append(name, score, date)
      table.appendChild(row)
    }

    leaderboard.appendChild(table)

    this.element = leaderboard
  }
}

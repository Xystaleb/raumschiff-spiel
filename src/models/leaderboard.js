export default class Leaderboard {
    /**
     * This is a constructor function that initializes properties for an object representing a table with
     * columns for name, score, and date.
     * @param entries - The `entries` parameter is an array that contains the data for the table. Each
     * element in the array represents a row in the table and should contain values for the columns
     * specified in the `columns` array.
     */
    constructor(entries){
        this.element = undefined;
        this.entries = entries;
        this.columns = [
            "Name",
            "Score",
            "Date"
        ];
    }

    /**
     * This function builds a leaderboard table with columns and rows based on provided entries.
     */
    build(){
        const leaderboard = document.createElement("div")
        leaderboard.className = "leaderboard";
        const table = document.createElement("table");

        // generate columns
        const col_row = document.createElement("tr");
        for(const col of this.columns){
            const th = document.createElement("th");
            th.innerHTML = col;
            col_row.appendChild(th);
        }
        table.appendChild(col_row);

        // generate rows based on this.entries
        for(const entry of this.entries){
            const row = document.createElement("tr");

            const name = document.createElement("td")
            name.innerHTML = entry["name"];

            const score = document.createElement("td")
            score.innerHTML = entry["score"];

            const date = document.createElement("td")
            date.innerHTML = entry["created"];

            row.append(name, score, date);
            table.appendChild(row);
        }

        leaderboard.appendChild(table);

        this.element = leaderboard;
    }
}
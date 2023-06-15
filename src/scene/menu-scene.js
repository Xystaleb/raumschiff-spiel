import Scene from './scene.js';
import GameScene from './game-scene.js';

class MenuScene extends Scene {
  build() {
    super.build();

    // Erstellt die Schaltflächen für den Einzel- und Mehrspielermodus
    const buttonSingleplayer = document.createElement('button');
    buttonSingleplayer.innerText = 'Singleplayer';

    const buttonMultiplayer = document.createElement('button');
    buttonMultiplayer.innerText = 'Multiplayer';

    // Fügt den Event-Listener für die Schaltflächen hinzu
    buttonSingleplayer.addEventListener('click', () => {
      this.showNameInput(true);
    });

    buttonMultiplayer.addEventListener('click', () => {
      this.showNameInput(false);
    });

    // Erstellt das Div-Element für die Schaltflächen
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons');
    buttonDiv.appendChild(buttonSingleplayer);
    buttonDiv.appendChild(buttonMultiplayer);

    // Erstellt das Div-Element für die Spielsteuerungen
    const controlDiv = document.createElement('div');
    controlDiv.classList.add('controlDiv');

    // Erstellt den Absatz für die Steuerungen des Spielers 1
    const player1Controls = document.createElement('p');
    player1Controls.innerText = 'Steuerung Spieler 1:\nW = Hoch\nA = Links\nD = Rechts\nS = Runter\nLeertaste = Schuss';

    // Erstellt den Absatz für die Steuerungen des Spielers 2
    const player2Controls = document.createElement('p');
    player2Controls.innerText = 'Steuerung Spieler 2:\nPfeil hoch = Hoch\nPfeil links = Links\nPfeil rechts = Rechts\nPfeil runter = Runter\nEnter = Schuss';

    // Fügt die Schaltflächen und Spielsteuerungen zum Haupt-Div hinzu
    buttonDiv.appendChild(player1Controls);
    buttonDiv.appendChild(player2Controls);
    this.view.appendChild(buttonDiv);
  }

  showNameInput(singlePlayer) {
    // Löscht den aktuellen Inhalt der Ansicht
    this.view.innerHTML = '';

    // Erstellt das Eingabefeld und die Beschriftung für den Namen des ersten Spielers
    const nameLabel = document.createElement('label');
    nameLabel.innerText = 'Name des ersten Spielers:';
    const nameInput = document.createElement('input');

    // Erstellt den Bestätigungsbutton und fügt den Event-Listener hinzu
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Bestätigen';
    submitButton.addEventListener('click', () => {
      const playerName = nameInput.value || 'Spieler';
      this.startPlaying(singlePlayer, playerName, '');
    });

    // Erstellt das Div-Element für den Namen des ersten Spielers und fügt die Elemente hinzu
    const nameInputContainer = document.createElement('div');
    nameInputContainer.classList.add('PlayerOneInput');
    nameInputContainer.appendChild(nameLabel);
    nameInputContainer.appendChild(nameInput);
    nameInputContainer.appendChild(submitButton);

    // Fügt das Div-Element zur Ansicht hinzu
    this.view.appendChild(nameInputContainer);

    if (!singlePlayer) {
      // Erstellt das Eingabefeld und die Beschriftung für den Namen des zweiten Spielers
      const secondNameLabel = document.createElement('label');
      secondNameLabel.innerText = 'Name des zweiten Spielers:';
      const secondNameInput = document.createElement('input');


      // Erzeugt ein Div-Element für den Namen des ersten Spielers
      const secondNameInputContainer = document.createElement('div');
      secondNameInputContainer.classList.add('PlayerTwoInput');
      secondNameInputContainer.appendChild(secondNameLabel);
      secondNameInputContainer.appendChild(secondNameInput);
      secondNameInputContainer.appendChild(secondSubmitButton);

      // Fügt das Div-Element zum Haupt-Div hinzu
      this.view.appendChild(secondNameInputContainer);
    }
  }

  // Erzeugt eine GameScene und startet das Spiel
  startPlaying(singlePlayer, name1, name2) {
    const gameScene = new GameScene(this.view, singlePlayer, name1, name2);
    gameScene.build();
    gameScene.draw();
  }
}

export default MenuScene;

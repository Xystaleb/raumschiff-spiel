import Scene from './scene.js';
import GameScene from './game-scene.js';

class MenuScene extends Scene {
  build() {
    super.build();

    const buttonSingleplayer = document.createElement('button');
    buttonSingleplayer.innerText = 'Singleplayer';

    const buttonMultiplayer = document.createElement('button');
    buttonMultiplayer.innerText = 'Multiplayer';

    buttonSingleplayer.addEventListener('click', () => {
      this.showNameInput(true);
    });

    buttonMultiplayer.addEventListener('click', () => {
      this.showNameInput(false);
    });

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons');
    buttonDiv.appendChild(buttonSingleplayer);


    const controlDiv = document.createElement('div');
    controlDiv.classList.add('controlDiv');

    const player1Controls = document.createElement('p');
    player1Controls.innerText = 'Steuerung Spieler 1:\nW = Hoch\nA = Links\nD = Rechts\nS = Runter\nLeertaste = Schuss';

    buttonDiv.appendChild(buttonMultiplayer);

    const player2Controls = document.createElement('p');
    player2Controls.innerText = 'Steuerung Spieler 2:\nPfeil hoch = Hoch\nPfeil links = Links\nPfeil rechts = Rechts\nPfeil runter = Runter\nEnter = Schuss';

    buttonDiv.appendChild(player1Controls);
    buttonDiv.appendChild(player2Controls);

    this.view.appendChild(buttonDiv);
  }



  showNameInput(singlePlayer) {
    this.view.innerHTML = '';

    const nameLabel = document.createElement('label');
    nameLabel.innerText = 'Name des ersten Spielers:';
    const nameInput = document.createElement('input');

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Bestätigen';
    submitButton.addEventListener('click', () => {
      const playerName = nameInput.value || 'Spieler';
      this.startPlaying(singlePlayer, playerName, '');
    });

    const nameInputContainer = document.createElement('div');
    nameInputContainer.classList.add('PlayerOneInput');
    nameInputContainer.appendChild(nameLabel);
    nameInputContainer.appendChild(nameInput);
    nameInputContainer.appendChild(submitButton);

    this.view.appendChild(nameInputContainer);

    if (!singlePlayer) {
      const secondNameLabel = document.createElement('label');
      secondNameLabel.innerText = 'Name des zweiten Spielers:';
      const secondNameInput = document.createElement('input');

      const secondSubmitButton = document.createElement('button');
      secondSubmitButton.innerText = 'Bestätigen';
      secondSubmitButton.addEventListener('click', () => {
        const playerName1 = nameInput.value || 'Spieler 1';
        const playerName2 = secondNameInput.value || 'Spieler 2';
        this.startPlaying(singlePlayer, playerName1, playerName2);
      });

      const secondNameInputContainer = document.createElement('div');
      secondNameInputContainer.classList.add('PlayerTwoInput');
      secondNameInputContainer.appendChild(secondNameLabel);
      secondNameInputContainer.appendChild(secondNameInput);
      secondNameInputContainer.appendChild(secondSubmitButton);

      this.view.appendChild(secondNameInputContainer);
    }
  }

  startPlaying(singlePlayer, name1, name2) {
    const gameScene = new GameScene(this.view, singlePlayer, name1, name2);
    gameScene.build();
    gameScene.draw();
  }
}

export default MenuScene;

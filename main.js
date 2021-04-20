(function () {
    "use strict";

    // game variables
    let player1Score = 0;
    let player2Score = 0;
    let isPlayer1Turn = true;

    // DOM variables
    let gameTitle = document.querySelector("[data-turn]");
    let whosTurn = gameTitle.querySelector("span");
    let player1 = document.querySelector("[data-player='1']");
    let player2 = document.querySelector("[data-player='2']");
    let dicePlayer1 = player1.querySelector(".dice");
    let dicePlayer2 = player2.querySelector(".dice");
    let scoreDisplayPlayer1 = player1.querySelector("[data-score]");
    let scoreDisplayPlayer2 = player2.querySelector("[data-score]");
    let rollBtn = document.querySelector("[data-roll]");
    let resetBtn = document.querySelector("[data-reset]");

    // functions
    let changeTurn = function () {
        isPlayer1Turn = !isPlayer1Turn;
        whosTurn.textContent = (parseInt(whosTurn.textContent) % 2) + 1;
        player1.toggleAttribute("data-active");
        player2.toggleAttribute("data-active");
    };

    let rollDice = function (currentdice) {
        let rollNumber = Math.floor(Math.random() * 6) + 1;
        currentdice.dataset.value = rollNumber;
        currentdice.innerHTML = "<div class='dot'></div>".repeat(rollNumber);

        return rollNumber;
    };

    let updateScores = function () {
        scoreDisplayPlayer1.textContent = player1Score;
        scoreDisplayPlayer2.textContent = player2Score;
    };

    let endGame = function () {
        rollBtn.style.display = "none";
        resetBtn.style.display = "block";
        gameTitle.textContent = `Congratulations player ${
            isPlayer1Turn ? 1 : 2
        }, you won!`;
    };

    // event listeners
    rollBtn.addEventListener("click", function () {
        if (isPlayer1Turn) {
            player1Score += rollDice(dicePlayer1);
            updateScores();
        } else {
            player2Score += rollDice(dicePlayer2);
            updateScores();
        }

        if (player1Score >= 20 || player2Score >= 20) {
            endGame();
        } else {
            changeTurn();
        }
    });

    resetBtn.addEventListener("click", function () {
        gameTitle.innerHTML = `It's the turn of player <span>${
            isPlayer1Turn ? 1 : 2
        }</span>`;
        whosTurn = gameTitle.querySelector("span");
        dicePlayer1.innerHTML = "";
        dicePlayer2.innerHTML = "";
        player1Score = 0;
        player2Score = 0;
        updateScores();
        rollBtn.style.display = "block";
        resetBtn.style.display = "none";
    });
})();

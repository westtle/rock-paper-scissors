let yourScore = 0;
let opponentScore = 0;

let gameHistory = [];
let lastGameResult = [];

// HTML.
const yourScoreHTML = document.querySelector(".your-score_");
const opponentScoreHTML = document.querySelector(".opponent-score_");
const winLoseHTML = document.querySelector(".win-lose_");

const yourChoiceHTML = document.querySelector(".your-choice__");
const opponentChoiceHTML = document.querySelector(".opponent-choice__");

const rockButton = document.querySelectorAll("._choices button")[0];
const paperButton = document.querySelectorAll("._choices button")[1];
const scissorsButton = document.querySelectorAll("._choices button")[2];

const resetButton = document.querySelector("._reset button");

const historyTable = document.querySelector("._table table");
const emptyTextTable = document.querySelector("._table .empty_");

function selectChoices() {
	let winLoseDraw;

	const yourChoice = this.innerText;
	yourChoiceHTML.innerText = yourChoice;

	const opponentChoice = ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)]
	opponentChoiceHTML.innerText = opponentChoice;

	// Checking Your Choice.
	if (yourChoice == opponentChoice) { // Draw.
		yourScore += 1;
		opponentScore += 1;
		winLoseDraw = "Draw";
	} else if (yourChoice == "Rock") { // Rock.
		if (opponentChoice == "Scissors") {
			yourScore += 1;
			winLoseDraw = "Win";
		} else if (opponentChoice == "Paper") {
			opponentScore += 1;
			winLoseDraw = "Lose";
		};
	} else if (yourChoice == "Paper") { // Paper.
		if (opponentChoice == "Rock") {
			yourScore += 1;
			winLoseDraw = "Win";
		} else if (opponentChoice == "Scissors") {
			opponentScore += 1;
			winLoseDraw = "Lose";
		};
	} else if (yourChoice == "Scissors") { // Scissors.
		if (opponentChoice == "Paper") {
			yourScore += 1;
			winLoseDraw = "Win";
		} else if (opponentChoice == "Rock") {
			opponentScore += 1;
			winLoseDraw = "Lose";
		};
	};

	winLoseHTML.innerText = winLoseDraw;

	// Update Score in HTML.
	yourScoreHTML.innerText = yourScore;
	opponentScoreHTML.innerText = opponentScore;

	// Update Game History.
	tableRender(yourChoice, opponentChoice, winLoseDraw);

	// Add To History.
	const gameResult = {yourChoice, opponentChoice, yourScore, opponentScore, winLoseDraw};
	gameHistory.push(gameResult);

	checkIfEmpty();
	saveHistory();
};

function resetData() {
	yourScore = 0;
	opponentScore = 0;

	yourScoreHTML.innerText = "0";
	opponentScoreHTML.innerText = "0";

	lastGameResult = gameHistory.slice(-1);
	gameHistory = [];

	historyTable.innerHTML = `<tr>
								<th style="width:25%">Result</th>
								<th style="width:50%">Choices</th>
								<th style="width:25%">Scores</th>
							</tr>`;

	checkIfEmpty();
	saveHistory();
};

function tableRender(yourChoice, opponentChoice, winLoseDraw) {
	let newRow = historyTable.insertRow(1);

	let cellOne = newRow.insertCell(0);
	let cellTwo = newRow.insertCell(1);
	let cellThree = newRow.insertCell(2);

	cellOne.innerHTML = `<td>${winLoseDraw}</td>`;
	cellTwo.innerHTML = `<td>${yourChoice} / ${opponentChoice}</td>`;
	cellThree.innerHTML = `<td>${yourScore} / ${opponentScore}</td>`;
};

function checkIfEmpty() {
	if (gameHistory.length > 0) {
		emptyTextTable.style.display = "none";
	} else {
		emptyTextTable.style.display = "flex";
	};
};

// Local Storage.

const game_history = "Game_History";
const last_game_result = "Last_Game_Result";

function saveHistory() {
	localStorage.setItem(game_history, JSON.stringify(gameHistory));
	localStorage.setItem(last_game_result, JSON.stringify(lastGameResult));
};

function loadHistory() {
    let gameHistoryFromStorage = JSON.parse(localStorage.getItem(game_history)) || [];
    let lastGameResultFromStorage = JSON.parse(localStorage.getItem(last_game_result)) || [];

    gameHistory = gameHistoryFromStorage;
    lastGameResult = lastGameResultFromStorage;

    // Show lastGameResult If Someone Resetted The Score & Refreshed The Page (Not 1st Time Visit).
    if (lastGameResult.length == 1) {
    	yourChoiceHTML.innerText = lastGameResult[0].yourChoice;
		opponentChoiceHTML.innerText = lastGameResult[0].opponentChoice;

		winLoseHTML.innerText = lastGameResult[0].winLoseDraw;
    }

    // Renderer.
    gameHistoryFromStorage.forEach((history, index) => {
    	yourScore = history.yourScore;
    	opponentScore = history.opponentScore;

    	yourScoreHTML.innerText = history.yourScore;
		opponentScoreHTML.innerText = history.opponentScore;

    	yourChoiceHTML.innerText = history.yourChoice;
		opponentChoiceHTML.innerText = history.opponentChoice;

		winLoseHTML.innerText = history.winLoseDraw;

		// Table.
		tableRender(history.yourChoice, history.opponentChoice, history.winLoseDraw);
    });
};

rockButton.addEventListener("click", selectChoices);
paperButton.addEventListener("click", selectChoices);
scissorsButton.addEventListener("click", selectChoices);
resetButton.addEventListener("click", resetData);

document.addEventListener("DOMContentLoaded", () => {
	loadHistory();
	checkIfEmpty();
});
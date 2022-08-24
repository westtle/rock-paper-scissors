let gameHistoryList = [];

let yourScore = 0;
let opponentScore = 0;

// HTML.
const yourScoreHtml = document.querySelector(".your-score");
const opponentScoreHtml = document.querySelector(".opponent-score");
const winLose = document.querySelector(".win-lose");

const yourChoice = document.querySelector(".your-choice");
const opponentChoice = document.querySelector(".opponent-choice");

const buttonRock = document.querySelectorAll("._choices button")[0];
const buttonPaper = document.querySelectorAll("._choices button")[1];
const buttonScissors = document.querySelectorAll("._choices button")[2];

const buttonReset = document.querySelector(".__reset button");

const historyTable = document.querySelector(".__history table");

class GameHistory {
	constructor(status, pickedChoice, choiceOpponent, yourScore, opponentScore) {
		this.winLoseStatus = status;
		this.pickedChoice = pickedChoice;
		this.choiceOpponent = choiceOpponent;
		this.yourScore = yourScore;
		this.opponentScore = opponentScore;
	}
};

function selectChoice() {
	let winLoseStatus;

	let pickedChoice = this.innerText;
	yourChoice.innerText = pickedChoice;

	const choicesForOpponent = ["Rock", "Paper", "Scissors"];
	choiceOpponent = choicesForOpponent[Math.floor(Math.random() * 3)]
	opponentChoice.innerText = choiceOpponent;

	// Score Condition Check.
	if (pickedChoice == choiceOpponent) {
		yourScore += 1;
		opponentScore += 1;
		winLose.innerText = "Draw";
		winLoseStatus = "Draw";
	} else if (pickedChoice == "Rock") {
		if (choiceOpponent == "Scissors") {
			yourScore += 1;
			winLose.innerText = "Win";
			winLoseStatus = "Win";
		} else if (choiceOpponent == "Paper") {
			opponentScore += 1;
			winLose.innerText = "Lose";
			winLoseStatus = "Lose";
		};
	} else if (pickedChoice == "Paper") {
		if (choiceOpponent == "Rock") {
			yourScore += 1;
			winLose.innerText = "Win";
			winLoseStatus = "Win";
		} else if (choiceOpponent == "Scissors") {
			opponentScore += 1;
			winLose.innerText = "Lose";
			winLoseStatus = "Lose";
		};
	} else if (pickedChoice == "Scissors") {
		if (choiceOpponent == "Paper") {
			yourScore += 1;
			winLose.innerText = "Win";
			winLoseStatus = "Win";
		} else if (choiceOpponent == "Rock") {
			opponentScore += 1;
			winLose.innerText = "Lose";
			winLoseStatus = "Lose";
		};
	};

	// Update HTML Score.
	yourScoreHtml.innerText = yourScore;
	opponentScoreHtml.innerText = opponentScore;

	// Update Game History.
	let newRow = historyTable.insertRow(1);

	let cellOne = newRow.insertCell(0);
	cellOne.innerHTML = `<td>${winLoseStatus}</td>`;
	let cellTwo = newRow.insertCell(1);
	cellTwo.innerHTML = `<td>${pickedChoice} / ${choiceOpponent}</td>`;
	let cellThree = newRow.insertCell(2);
	cellThree.innerHTML = `<td>${yourScore} / ${opponentScore}</td>`;

	// Save Game History.
	let gameHistory = new GameHistory(winLoseStatus, pickedChoice, choiceOpponent, yourScore, opponentScore);
	gameHistoryList.push(gameHistory);
	saveHistory();
};

function resetData() {
	yourScore = 0;
	opponentScore = 0;

	yourScoreHtml.innerText = "0";
	opponentScoreHtml.innerText = "0";

	winLose.innerText = "Win / Lose / Draw";

	yourChoice.innerText = `\n`;
	opponentChoice.innerText = `\n`;

	historyTable.innerHTML = `<tr>
								<th style="width:25%">Win / Lose</th>
								<th style="width:50%">Choices</th>
								<th style="width:25%">Scores</th>
							</tr>`;

	gameHistoryList = [];
	saveHistory();
};

// Local Storage.

const storageKey = "Game_History";

function saveHistory() {
	const storageItem = JSON.stringify(gameHistoryList)
	localStorage.setItem(storageKey, storageItem);
};

function loadHistory() {
	const storageGet = localStorage.getItem(storageKey);
	let storageParsed = JSON.parse(storageGet);

	// Renderer.
	for (let i = 0;  i < storageParsed.length; i++) {
		let newRow = historyTable.insertRow(1);

		let cellOne = newRow.insertCell(0);
		cellOne.innerHTML = `<td>${storageParsed[i].winLoseStatus}</td>`;
		let cellTwo = newRow.insertCell(1);
		cellTwo.innerHTML = `<td>${storageParsed[i].pickedChoice} / ${storageParsed[i].choiceOpponent}</td>`;
		let cellThree = newRow.insertCell(2);
		cellThree.innerHTML = `<td>${storageParsed[i].yourScore} / ${storageParsed[i].opponentScore}</td>`;

		winLose.innerText = storageParsed[i].winLoseStatus;

		yourScore = storageParsed[i].yourScore;
		opponentScore = storageParsed[i].opponentScore;

		yourScoreHtml.innerText = storageParsed[i].yourScore;
		opponentScoreHtml.innerText = storageParsed[i].opponentScore;

		yourChoice.innerText = storageParsed[i].pickedChoice;
		opponentChoice.innerText = storageParsed[i].choiceOpponent;

		gameHistoryList.push(storageParsed[i]);
		saveHistory();
	};
};

buttonRock.addEventListener("click", selectChoice);
buttonPaper.addEventListener("click", selectChoice);
buttonScissors.addEventListener("click", selectChoice);

buttonReset.addEventListener("click", resetData);

document.addEventListener("DOMContentLoaded", () => {
	loadHistory();
});
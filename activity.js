class Activity {
    canvas;
    turn;
    turnIndicator;
    thisTeamNameElement;
    thisTeamScoreElement;
    otherTeamScoreElement;

    constructor() {
        this.thisTeamNameElement = document.querySelector("#thisTeamNameElement");
        this.thisTeamNameElement.textContent = this.getTeamName();

        this.thisTeamScoreElement = document.querySelector("#thisTeamScoreElement");
        this.thisTeamScoreElement.textContent = 0;

        this.otherTeamScoreElement = document.querySelector("#otherTeamScoreElement");
        this.otherTeamScoreElement.textContent = 0;

        this.turnIndicator = document.querySelector("#turnIndicator");

        this.canvas = document.querySelector("canvas");
        this.canvas.addEventListener("mousedown", (event) => {
            if (this.turn === "SET") {
                setAnswer(this.canvas, event);
                this.turn = "GUESS";
            } else {
                guessAnswer(this.canvas, event);
            }
        });

        this.turn = "SET";
    }

    getTeamName() {
        return localStorage.getItem("name") ?? "Error: Missing name";
    }
}

const activity = new Activity();

function setAnswer(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    localStorage.setItem("x", x);
    localStorage.setItem("y", y);

    activity.turnIndicator.textContent = "GUESS";
}

function guessAnswer(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if ((Math.abs(parseInt(localStorage.getItem("x")) - x) < 15) && (Math.abs(parseInt(localStorage.getItem("y")) - y) < 15)) {
        activity.turn = "SET"
        activity.turnIndicator.textContent = "SET";

        updateScore(activity.thisTeamScoreElement);
    }
}

function updateScore(teamScoreElement) {
    teamScoreElement.textContent = parseInt(teamScoreElement.textContent) + 1;

    const thisTeamPositionElement = document.querySelector('#thisTeamPositionElement');
    const otherTeamPositionElement = document.querySelector('#otherTeamPositionElement');

    if (parseInt(activity.thisTeamScoreElement.textContent) > parseInt(activity.otherTeamScoreElement.textContent)) {
        thisTeamPositionElement.textContent = 1;
        otherTeamPositionElement.textContent = 2;
    } else if (parseInt(activity.thisTeamScoreElement.textContent) === parseInt(activity.otherTeamScoreElement.textContent)) {
        thisTeamPositionElement.textContent = 1;
        otherTeamPositionElement.textContent = 1;
    } else {
        thisTeamPositionElement.textContent = 2;
        otherTeamPositionElement.textContent = 1;
    }
}

// Simulate team scores that will come over WebSocket
setInterval(() => {
    updateScore(activity.otherTeamScoreElement);
  }, 5000);
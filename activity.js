class Activity {
    canvas;
    turn;
    turnIndicator;
    thisTeamNameElement;
    thisTeamScoreElement;

    constructor() {
        this.thisTeamNameElement = document.querySelector("#thisTeamNameElement");
        this.thisTeamNameElement.textContent = this.getTeamName();

        this.thisTeamScoreElement = document.querySelector("#thisTeamScoreElement");
        this.thisTeamScoreElement.textContent = 0;

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

        activity.thisTeamScoreElement.textContent = parseInt(activity.thisTeamScoreElement.textContent) + 1;
    }
}

// Simulate team scores that will come over WebSocket
setInterval(() => {
    const otherTeamScoreElement = document.querySelector("#otherTeamScoreElement");
    otherTeamScoreElement.textContent = parseInt(otherTeamScoreElement.textContent) + 1
  }, 5000);
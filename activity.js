class Activity {
    canvas;
    turn;
    turnIndicator;
    thisTeamNameElement;

    constructor() {
        this.thisTeamNameElement = document.querySelector("#thisTeamNameElement");
        this.thisTeamNameElement.textContent = this.getTeamName();

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

    if (((parseInt(localStorage.getItem("x")) - x) < 5) && ((parseInt(localStorage.getItem("y")) - y) < 5)) {
        activity.turn = "SET"
        activity.turnIndicator.textContent = "SET";
    }
}
class Activity {

    constructor() {
        const thisTeamNameElement = document.querySelector("#thisTeamNameElement");
        thisTeamNameElement.textContent = this.getTeamName();
    }

    getTeamName() {
        return localStorage.getItem("name") ?? "Error: Missing name";
    }
}

const activity = new Activity();
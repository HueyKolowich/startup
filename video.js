const thisParticipantVideoContainer = document.getElementById("thisParticipantVideoContainer");

let meeting = null;

async function fetchAuthToken() {
    //Just return a default auth token here
}

fetchAuthToken().then(() => {
    meeting = window.VideoSDK.initMeeting({
        meetingId: "9rnr-tf27-4suk",
        name: "Huey's Org",
        micEnabled: true,
        webcamEnabled: true,
    });
});
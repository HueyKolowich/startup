const localParticipantVideoContainer = document.getElementById("localParticipantVideoContainer");
const tempAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2OGMwNDNiOC0wNmI0LTRhN2YtYWEwMC1lNGFkZGM5YTY3MDEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwOTI3MTM0OSwiZXhwIjoxNzA5ODc2MTQ5fQ.6IdajDtfwJ_ZYcI0LXMUd_Ba5qiGtxDotj6GHM0uR60";

let participants = [];
let meeting = null;
let localParticipant;
let localParticipantAudio;
let remoteParticipantId = "";
  
window.VideoSDK.config(tempAuthToken);

meeting = window.VideoSDK.initMeeting({
    meetingId: "9rnr-tf27-4suk", // required
    name: "Huey's Org", // required
    micEnabled: true, // optional, default: true
    webcamEnabled: true, // optional, default: true
});

// creating local participant
createLocalParticipant();

// setting local participant stream
meeting.localParticipant.on("stream-enabled", (stream) => {
    setTrack(
        stream,
        localParticipantAudio,
        meeting.localParticipant,
        (isLocal = true)
    );
});

// other participants
meeting.on("participant-joined", (participant) => {
    let videoElement = createVideoElement(participant.id);
    let audioElement = createAudioElement(participant.id);
    remoteParticipantId = participant.id;

    participant.on("stream-enabled", (stream) => {
        setTrack(stream, audioElement, participant, (isLocal = false));
    });

    localParticipantVideoContainer.appendChild(videoElement);
    localParticipantVideoContainer.appendChild(audioElement);
});

// participants left
meeting.on("participant-left", (participant) => {
    let vElement = document.getElementById(`v-${participant.id}`);
    vElement.parentNode.removeChild(vElement);

    let aElement = document.getElementById(`a-${participant.id}`);
    aElement.parentNode.removeChild(aElement);

    //remove it from participant list participantId;
    document.getElementById(`p-${participant.id}`).remove();
});

meeting.join();

// creating video element
function createVideoElement(pId) {
    let videoElement = document.createElement("video");
    videoElement.classList.add("video-frame");
    videoElement.setAttribute("id", `v-${pId}`);
    videoElement.setAttribute("playsinline", true);
    videoElement.setAttribute("width", "300");
    return videoElement;
}

// creating audio element
function createAudioElement(pId) {
    let audioElement = document.createElement("audio");
    audioElement.setAttribute("id", `a-${pId}`);
    audioElement.setAttribute("autoPlay", "false");
    audioElement.setAttribute("playsInline", "true");
    audioElement.setAttribute("controls", "false");
    return audioElement;
}

// creating local participant
function createLocalParticipant() {
    localParticipant = createVideoElement(meeting.localParticipant.id);
    localParticipantVideoContainer.appendChild(localParticipant);
}

// setting media track
function setTrack(stream, audioElement, participant, isLocal) {
    if (stream.kind == "video") {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(stream.track);
        let videoElm = document.getElementById(`v-${participant.id}`);
        videoElm.srcObject = mediaStream;
        videoElm
        .play()
        .catch((error) =>
            console.error("videoElem.current.play() failed", error)
        );
    }
    if (stream.kind == "audio" && !isLocal) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(stream.track);
        audioElement.srcObject = mediaStream;
        audioElement
        .play()
        .catch((error) => console.error("audioElem.play() failed", error));
    }
}
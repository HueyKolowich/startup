function login() {
    const nameElement = document.querySelector("#name");
    
    if (nameElement.value) {
        window.location.href = "waitingroom.html";
    } else {
        const loginButtonElement = document.querySelector("#login");

        const keyframes = [
            { color: "#FB9681" },
            { color: "white" },
          ];
          
        const timing = {
        duration: 3000,
        iterations: 1,
        };
        
        loginButtonElement.animate(keyframes, timing);
    }
  }
  
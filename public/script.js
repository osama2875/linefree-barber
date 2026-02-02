function getToken() {
  fetch("/get-token", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("myToken", data.token);
      updateStatus();
    });
}

function updateStatus() {
  fetch("/status")
    .then(res => res.json())
    .then(data => {
      const myToken = localStorage.getItem("myToken");

      // CUSTOMER PAGE
      const resultBox = document.getElementById("result");
      if (resultBox && myToken) {
        resultBox.innerHTML = `
          Your Token: <b>${myToken}</b><br>
          People before you: <b>${myToken - data.currentToken - 1}</b>
        `;
      }

      // BARBER PAGE
      const current = document.getElementById("current");
      if (current) {
        current.innerText = "Current Token: " + data.currentToken;
      }
    });
}

function nextToken() {
  fetch("/next", { method: "POST" })
    .then(() => updateStatus());
}

function resetDay() {
  fetch("/reset", { method: "POST" })
    .then(() => {
      localStorage.removeItem("myToken");
      updateStatus();
    });
}

// 🔥 VERY IMPORTANT (HTML buttons ke liye)
window.getToken = getToken;
window.nextToken = nextToken;
window.resetDay = resetDay;

// Auto refresh (slow internet friendly)
setInterval(updateStatus, 10000);
updateStatus();

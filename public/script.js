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

      // ✅ CUSTOMER PAGE SAFE UPDATE
      const resultBox = document.getElementById("result");
      if (resultBox && myToken) {
        resultBox.innerHTML = `
          Your Token: <b>${myToken}</b><br>
          People before you: <b>${myToken - data.currentToken - 1}</b>
        `;
      }

      // ✅ BARBER PAGE SAFE UPDATE
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
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let currentToken = 0;
let lastToken = 0;

// Customer gets token
app.post("/get-token", (req, res) => {
  lastToken++;
  res.json({
    token: lastToken,
    currentToken
  });
});

// Get queue status
app.get("/status", (req, res) => {
  res.json({ currentToken, lastToken });
});

// Barber NEXT
app.post("/next", (req, res) => {
  if (currentToken < lastToken) {
    currentToken++;
  }
  res.json({ currentToken });
});

// Reset day
app.post("/reset", (req, res) => {
  currentToken = 0;
  lastToken = 0;
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("✅ LineFree Barber running on http://localhost:3000");
});

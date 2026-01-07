const express = require("express");
const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  res.send("GET users");
});

app.post("/users", (req, res) => {
  res.send("POST users");
});

app.listen(3001, () => console.log("Server running"));

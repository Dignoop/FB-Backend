const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = "./db.json";

// helper
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// 👉 Get all freelance services
app.get("/services", (req, res) => {
  const db = readDB();
  res.json(db.services);
});

// 👉 Register
app.post("/register", (req, res) => {
  const db = readDB();
  const user = req.body;

  db.users.push(user);
  writeDB(db);

  res.json({ message: "Registration successful" });
});

// 👉 Login
app.post("/login", (req, res) => {
  const db = readDB();
  const { email, password } = req.body;

  const user = db.users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

// 👉 Hire freelancer / submit proposal
app.post("/proposal", (req, res) => {
  const db = readDB();
  const proposal = req.body;

  db.proposals.push(proposal);
  writeDB(db);

  res.json({ message: "Proposal sent successfully" });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

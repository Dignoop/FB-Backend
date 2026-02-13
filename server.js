const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ROOT ROUTE (THIS FIXES "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 👇 SERVICES API
app.get("/services", (req, res) => {
  res.json([
    { name: "Frontend Development", price: "8000" },
    { name: "Backend Development", price: "10000" },
    { name: "UI/UX Design", price: "6000" }
  ]);
});

// ⚠️ IMPORTANT: Render uses process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

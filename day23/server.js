const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// sample route
app.get("/api/projects", (req, res) => {
  res.json([
    { id: 1, name: "Project A", description: "First project" },
    { id: 2, name: "Project B", description: "Second project" },
    { id: 3, name: "Project C", description: "Third project" },
  ]);
});

// run server on port 5000
app.listen(5001, () => {
  console.log("🚀 Backend running at http://localhost:5001");
});

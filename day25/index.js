const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const experienceRoutes = require("./routes/experienceRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/experiences", experienceRoutes);

app.use(errorHandler);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

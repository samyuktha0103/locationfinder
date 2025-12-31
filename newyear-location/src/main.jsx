const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/location", (req, res) => {
  console.log("📍 RECEIVER LOCATION:");
  console.log(req.body);
  res.json({ status: "received" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

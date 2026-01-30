const express = require("express");
const app = express();

// 🔥 BODY PARSER (MUST BE FIRST)
app.use(express.json());

app.post("/test", (req, res) => {
  console.log("TEST BODY 👉", req.body);
  res.json(req.body);
});

app.listen(9000, () => {
  console.log("Test server running on port 9000");
});

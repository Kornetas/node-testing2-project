const express = require("express");
const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
  res.send("ye");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("server run in port 3000");
  });
}

module.exports = app;

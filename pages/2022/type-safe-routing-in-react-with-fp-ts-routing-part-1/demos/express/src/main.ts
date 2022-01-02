import * as Express from "express";

const app = Express();

app.get("/search/:query", (req, res) => {
  res.send(`Search query: ${req.params.query}`);
});

app.listen(3000);

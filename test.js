// vulnerable.js
const express = require("express");
const app = express();

app.get("/greet", (req, res) => {
  // ❌ 脆弱：ユーザー入力をそのまま innerHTML に出力
  const name = req.query.name;
  res.send(`<h1>Hello ${name}</h1>`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

if (require.main === module) {
  app.listen(3000, () => {
    console.lo("Server running on http://localhost:3000");
  });
}

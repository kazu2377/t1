// arithmetic.js  — ES Modules 版

/** @throws {TypeError} 数値以外が渡されたとき */
function _assertNumber(n, name = "value") {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new TypeError(`${name} は有限な数値である必要があります（受け取った値: ${n}）。`);
  }
}

/** 足し算 */
export function add(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  return a + b;
}

/** 引き算 */
export function sub(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  return a - b;
}

/** 掛け算 */
export function mul(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  return a * b;
}

/** 割り算（0除算を防止） */
export function div(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  if (b === 0) throw new RangeError("0 で割ることはできません。");
  return a / b;
}

// vulnerable.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const db = new sqlite3.Database(":memory:");

// サンプル用のテーブル作成
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER, name TEXT)");
  db.run("INSERT INTO users VALUES (1, 'taro'), (2, 'hanako')");
});

// ❌ 脆弱：文字列をそのままクエリに結合
app.get("/user", (req, res) => {
  const name = req.query.name;
  const sql = `SELECT * FROM users WHERE name = '${name}'`;
  console.log("実行SQL:", sql);
  db.all(sql, [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => console.log("http://localhost:3000"));

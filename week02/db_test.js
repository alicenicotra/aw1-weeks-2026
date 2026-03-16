import sqlite from "sqlite3";

const db = new sqlite.Database("transcript.sqlite", (err) => {
  if (err) throw err;
});

let sql = "SELECT * FROM course";
let results = [];

db.all(sql, (err, rows) => {
  if (err) throw err;
  for (let row of rows) {
    results.push(row);
    //console.log(row);
  }
});

console.log("*******");
for (let r of results)
  console.log(r);
console.log("*******");
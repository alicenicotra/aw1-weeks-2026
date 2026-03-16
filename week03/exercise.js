import sqlite from "sqlite3";
import dayjs from "dayjs";

// Apriamo il DB in modo globale
const db = new sqlite.Database("questions.sqlite", (err) =>{
    if (err) throw err;
})

function Question(id, text, authorEmail, authorId, date) {
    this.id = id;
    this.text = text;
    this.author = {email: authorEmail, id: authorId};
    this.date = dayjs(date);

    this.voteAnswer = (answerId, value) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE answer SET score = score + ? WHERE id = ?";
            const delta = value === "up" ? 1 : -1;
            db.run(sql, [delta, answerId], function(err) {
                if(err) reject(err);
                else resolve(this.changes);
            });
        });
    }
}

function Answer(id, text, authorEmail, authorId, date, score = 0) {
    this.id = id;
    this.text = text;
    this.author = {email: authorEmail, id: authorId};
    this.date = dayjs(date);
    this.score = score;
}

function QuestionList() {
    this.getQuestion = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?";
            db.get(sql, [id], (err, row) => {
                if(err)
                    reject(err);
                else if(row !== undefined)
                    resolve(new Question(row.id, row.text, row.email, row.authorId, row.date));
                else 
                    resolve("Question not available, check the id.");
            });
        });
    }

    this.addQuestion = (question) => {
        return new Promise((resolve, reject) => {
            const sql = " INSERT INTO question(text, authorId, date) VALUES(?,?,?)";
            db.run(sql, [question.text, question.author.id, question.date.format("YYYY-MM-DD")], function(err) {
                if(err) reject(err);
                else resolve(this.lastID);
            });
        });

    }
}

async function main() {
    const ql = new QuestionList();
    const questionOne = await ql.getQuestion(1);
    // ql.getQuestion(1).then(questionOne => ...);

    console.log(questionOne);
}

main();

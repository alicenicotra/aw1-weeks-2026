import sqlite from "sqlite3";
import dayjs from "dayjs";

const db = new sqlite.Database("questions.sqlite", (err) => {
  if (err) throw err;
})

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, authorEmail, authorId, date) {
  this.id = id;
  this.text = text;
  this.author = {email: authorEmail, id: authorId};
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte da una Question
  this.getAnswers = () => {
    return new Promise ((resolve, reject) => {
      const sql = "SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId = user.id WHERE answer.questionId = ?";
      db.all(sql, [this.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.authorId, ans.date, ans.score));
          resolve(answers);
        }
      });
    });
  }

  // metodo per aggiungere una nuova risposta di un autore esistente a una Question esistente
  this.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?, ?, ?, ?, ?)";
      db.run(sql, [answer.text, answer.author.id, answer.date.format("YYYY-MM-DD"), answer.score, this.id], function (err) {
        if (err)
          reject(err);
        else
          resolve(this.lastID);
      });
    });
  }

  // metodo per votare una risposta esistente, con up = +1 e down = -1
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

// Oggetto rappresentante le risposte (con le sue proprietà)
function Answer(id, text, authorEmail, authorId, date, score = 0) {
  this.id = id;
  this.text = text;
  this.author = {email: authorEmail, id: authorId};
  this.score = score;
  this.date = dayjs(date);
}

// Oggetto rappresentante la lista di domande (con i suoi metodi)
function QuestionList() {

  // metodo per recuperare una Question dato il suo ID
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

  // metodo per aggiungere una nuova Question di un autore esistente
  this.addQuestion = (question) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO question(text, authorId, date) VALUES (?,?,?)";
      db.run(sql, [question.text, question.author.id, question.date.format("YYYY-MM-DD")], function(err) {
        if(err) reject (err);
        else resolve(this.lastID);
      });
    });
  }
}

// funzione per il test -- modifica il DB
async function main() {
  const ql = new QuestionList();
  
  const questionOne = await ql.getQuestion(1);
  // ql.getQuestion(1).then(questionOne => console.log(questionOne));
  console.log(questionOne);

  console.log(await questionOne.getAnswers());
  const newAnswerId = await questionOne.addAnswer(new Answer(undefined, "test", "luigi.derussis@polito.it", 1, dayjs()));
  console.log("ID OF THE NEW ANSWER: " + newAnswerId);
  console.log("# OF CHANGES DUE TO THE VOTE: " + await questionOne.voteAnswer(newAnswerId, "up"));
  console.log(await questionOne.getAnswers());

  const newQuestionId = await ql.addQuestion(new Question(undefined, "Is 1 bigger than 10?", "luigi.derussis@polito.it", 1, dayjs()));
  const newQuestion = await ql.getQuestion(newQuestionId);
  console.log("NEWLY ADDED QUESTION: " + newQuestion.text);
  console.log(await newQuestion.getAnswers());
}

main();
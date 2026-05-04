/* Come l'esercizio di settimana 3 ma senza metodi */
import dayjs from "dayjs";

function Question(id, text, authorEmail, authorId, date) {
  this.id = id;
  this.text = text;
  this.author = {email: authorEmail, id: authorId};
  this.date = dayjs(date);
}

function Answer(id, text, authorEmail, authorId, date, score = 0) {
  this.id = id;
  this.text = text;
  this.author = {email: authorEmail, id: authorId};
  this.score = score;
  this.date = dayjs(date);

  this.serialize = () => {
    return {id: this.id, text: this.text, author: this.author, date: this.date.format("YYYY-MM-DD"), score: this.score};
  }
}

export {Question, Answer};
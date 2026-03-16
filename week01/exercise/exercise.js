//const dayjs = require('dayjs'); // commonJS

import dayjs from "dayjs";  // standard JS

//console.log(dayjs());

function Answer (text, userId, date, score=0) {
    this.text = text;
    this.userId = userId;
    this.date = dayjs(date);
    this.score = score;

    this.toString = () => {
        return `\n ${this.userId} replied ${this.text} on ${this.date.format("YYYY-MM-DD")} with a score of ${this.score}`;
    }
}

function Question (text, userId, date) {
    this.text = text;
    this.userId = userId;
    this.date = dayjs(date);
    this.answers = [];

    this.addAnswer = (answer) => {
        this.answers.push(answer);
    }

    this.getAnswers = (userId) => {
        /*
        const foundAnswers = [];
        for (const ans of this.answers){
            if(ans.userId === userId)
                foundAnswers.push(ans);
        }
        return foundAnswers;
        */

        return this.answers.filter(ans => ans.userId === userId);
    }

    this.afterDate = (date) => {
        return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
    }

    this.listByDate = () => {
        return [...this.answers].sort((a,b) => (a.date.isAfter(b.date)) ? 1: -1);
    }

    this.listByScore = () => {
        return [...this.answers].sort((a,b) => b.score - a.score);
    }
}

/* USERS
1: Luigi
2: Marco
3: Piero
4: Alice
*/

const question = new Question("Is JavaScript better than Python?", 1, "2026-02-23");

const firstAnswer = new Answer("No", 2, "2026-02-24");
const secondAnswer = new Answer("Yes", 3, "2026-02-24", -10);
const thirdAnswer = new Answer("Not in a million year", 4, "2026-02-25", 5);
const fourthAnswer = new Answer("Then, I don't know", 3, "2026-02-24");

question.addAnswer(firstAnswer);
question.addAnswer(secondAnswer);
question.addAnswer(thirdAnswer);
question.addAnswer(fourthAnswer);

const answerByPiero = question.getAnswers(3);

console.log(question);
console.log("Le risposte di Piero: " + answerByPiero);

console.log("\nLe risposte per data: " + question.listByDate());
console.log("\nLe risposte per score: " + question.listByScore());
console.log("\nLe risposte dopo il 24/02: " + question.afterDate("2026-02-24"));

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Question, Answer } from "./models/QAModels.js";
import QuestionDescription from "./components/QuestionDescription.jsx";
import Answers from "./components/Answers";
import { Routes, Route } from "react-router";
import DefaultLayout from "./components/DefaultLayout.jsx";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm.jsx";
import Questions from "./components/Questions.jsx";
import NotFound from "./components/NotFound.jsx";

const myQuestion = new Question(1, "Is Javascript better than Python?", "luigi.derussis@polito.it", 1, "2026-03-30");

myQuestion.answers = [
  new Answer(1, "Yes, it is!", "luca.scibetta@polito.it", 2, "2026-03-30", 5),
  new Answer(2, "No, it isn't!", "mario.rossi@mail.it"  , 3, "2026-03-30", -2),
  new Answer(3, "It depends on the use case.", "claudia.bianchi@mail.it", 4, "2026-03-30", 0)
];

{/* ROUTES:
  - index: / (tutte le domande)
  - domanda "id" con le sue risposte: /questions/:qid
  - nuova risposta: /questions/:qid/answers/new
  - modificare risposta: /questions/:qid/answers/:aid/edit
  - not found: *

  OPZIONE 2:
  - nuova risposta: /answers/new
  - modificare risposta: /answers/:aid/edit
  */}

function App() {
  const [questions, setQuestions] = useState([myQuestion]);
  const [answers, setAnswers] = useState(myQuestion.answers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answerId)
          return new Answer(ans.id, ans.text, ans.author.email, ans.author.id, ans.date, ans.score + 1);
        else return ans;
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      // temporaneo
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answer.id)
          return new Answer(answer.id, answer.text, answer.email, ans.author.id, answer.date, ans.score);
        else return ans;
      });
    });
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId); 
    });
  }

  return (
    <Routes>
      <Route element={ <DefaultLayout />}>
        <Route path="/" element={ <Questions questions={questions}/> } />
        <Route path="/questions/:questionId" element={ <QuestionDescription questions={questions} /> }>
          <Route index element={ <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} editAnswer={updateAnswer} deleteAnswer={deleteAnswer}/> } ></Route>
          <Route path="answers/new" element={<AnswerForm addAnswer={addAnswer} />}></Route>
          {/*<Route path="answers/:answerId/edit" element={<EditAnswerForm answers={answers} editAnswer={updateAnswer}/>}></Route>*/}
          <Route path="answers/:answerId/edit" element={<EditAnswerForm editAnswer={updateAnswer}/>}></Route>
          <Route path="*" element={ <NotFound /> } />
        </Route>
        
      </Route>
  </Routes>
  )

}

export default App;

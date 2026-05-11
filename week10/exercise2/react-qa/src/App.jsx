import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import { Question } from "./models/QAModels.js";
import QuestionDescription from "./components/QuestionDescription.jsx";
import Answers from "./components/Answers";
import { Routes, Route } from "react-router";
import DefaultLayout from "./components/DefaultLayout.jsx";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm.jsx";
import Questions from "./components/Questions.jsx";
import NotFound from "./components/NotFound.jsx";
import API from "./API/API.js";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

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

  return (
    <Routes>
      <Route element={ <DefaultLayout />}>
        <Route path="/" element={ <Questions questions={questions}/> } />
        <Route path="/questions/:questionId" element={ <QuestionDescription questions={questions} /> }>
          <Route index element={ <Answers addAnswer={addAnswer} editAnswer={updateAnswer} /> } ></Route>
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

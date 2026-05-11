import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import API from "../API/API.js";
import { Answer } from "../models/QAModels.js";


function Answers (props) {
  const [answers, setAnswers] = useState([]);

  const { questionId } = useParams();

  useEffect(() => {
    const getAnswers = async () => {
      const answers = await API.getAnswers(questionId);
      setAnswers(answers);
    }
    getAnswers();
  }, []);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answerId)
          return new Answer(ans.id, ans.text, ans.author.email, ans.author.id, ans.date, ans.score + 1);
        else
          return ans;
      });
    });
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId); 
    });
  }

  return(
    <>
    <Row>
      <Col as="h2">Answers:</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        <AnswerTable answers={answers} voteUp={voteUp} deleteAnswer={deleteAnswer}/>
        <Link className="btn btn-primary" to="answers/new">Add</Link>
      </Col>
    </Row>
    </>
  );
}

function AnswerTable (props) {
  const [sortOrder, setSortOrder] = useState("none");

  const sortByScore = () => {
    setSortOrder(oldOrder => oldOrder === "asc" ? "desc" : "asc");
  }

  const sortedAnswers = [... props.answers];
  if(sortOrder === "asc")
    sortedAnswers.sort((a,b) => a.score - b.score);
  else if (sortOrder === "desc")
    sortedAnswers.sort((a,b) => b.score - a.score);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>text</th>
          <th>Author</th>
          <th>Score <Button variant="link" className="text-black" onClick={sortByScore}><i className={sortOrder === "asc"? "bi bi-sort-numeric-up": "bi bi-sort-numeric-down"}></i></Button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { sortedAnswers.map((ans) => <AnswerRow key={ans.id} answer={ans} voteUp={props.voteUp} handleEdit={props.handleEdit} deleteAnswer={props.deleteAnswer} />) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer} /><AnswerAction {...props} /></tr>
  );
}

function AnswerData(props) {
  return(
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.author.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return(
    <td>
      <Button variant="warning" onClick={() => props.voteUp(props.answer.id)}><i className="bi bi-arrow-up" /></Button>
      {/*<Link className="btn btn-primary mx-1" to={`answers/${props.answer.id}/edit`}><i className="bi bi-pencil-square" /></Link>*/}
      <Link className="btn btn-primary mx-1" to={`answers/${props.answer.id}/edit`} state={props.answer.serialize()}><i className="bi bi-pencil-square" /></Link>
      <Button variant="danger" onClick={() => props.deleteAnswer(props.answer.id)}><i className="bi bi-trash" /></Button>
    </td>
  );
}

export default Answers;
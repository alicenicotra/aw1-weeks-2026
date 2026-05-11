import dayjs from "dayjs";
import { useActionState } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import API from "../API/API.js";

export function EditAnswerForm(props) {
  /*// 1. metodo con useParams
  const params = useParams();
  const aId = params.answerId;

  const answer = props.answers.filter(ans => ans.id == aId)[0];*/

  // 2. metodo con useLocation
  const location = useLocation();
  const answer = location.state;
  // ricostruiamo l'oggetto dayjs dalla stringa
  answer.date = dayjs(answer.date);

  return (
    <>
    {answer ?
      <AnswerForm answer={answer} editAnswer={props.editAnswer} user={props.user} /> :
      <Row>
        <Col as="p" className="lead">Impossible to edit a non-existent answer.</Col>
      </Row>
    }
    </>
  );
}

export function AnswerForm(props) {
  const navigate = useNavigate();
  const { questionId } = useParams();

  const initialState = {
    text: props.answer?.text,
    email: props.answer?.author.email ?? props.user.username,
    date: props.answer?.date.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
  };

  const handleSubmit = async (prevState, formData) => {
    // creare un oggetto dal formData
    const answer = Object.fromEntries(formData.entries());

    // esempio di validazione
    if(answer.text.trim()==="") {
      answer.error = "The answer can't be empty, please fix it!"
      answer.date = dayjs(answer.date);
      return answer;
    }

    if(props.addAnswer)
      // aggiungo la risposta
      try {
        await API.addAnswer({...answer, author: {email: props.user.username, id: props.user.id }}, questionId);
      }
      catch(serverError) {
        answer.error = serverError;
        console.error(serverError);
        return answer;
      }
    else
      try {
        await API.updateAnswer({id: props.answer.id, ...answer, author: props.answer.author, score: props.answer.score});
      }
      catch(serverError) {
        answer.error = serverError;
        return answer;
      }

    navigate(`/questions/${questionId}`);
  }

  const [state, formAction] = useActionState(handleSubmit, initialState);

  return(
    <>
      {state.error && <Alert variant="secondary">{state.error}</Alert>}
      <Form action={formAction}>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>e-mail</Form.Label>
          <Form.Control name="email" type="email" required={true} defaultValue={state.email} disabled></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required={true} defaultValue={state.date}></Form.Control>
        </Form.Group>
        {props.addAnswer && <Button variant="primary" type="submit">Add</Button>}
        {props.editAnswer && <Button variant="success" type="submit">Edit</Button>}
        {" "}
        <Link className="btn btn-danger" to={`/questions/${questionId}`}>Cancel</Link>
      </Form>
    </>
  );

}
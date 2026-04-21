import dayjs from "dayjs";
import { useActionState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

function AnswerForm(props) {
  const initialState = {
    text: props.answer?.text,
    email: props.answer?.author.email,
    date: props.answer?.date ?? dayjs()
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
      props.addAnswer(answer);
    else
      props.editAnswer({id: props.answer.id, ... answer});


    return initialState;
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
          <Form.Control name="email" type="email" required={true} defaultValue={state.email}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required={true} defaultValue={state.date.format("YYYY-MM-DD")}></Form.Control>
        </Form.Group>
        {props.addAnswer && <Button variant="primary" type="submit">Add</Button>}
        {props.editAnswer && <Button variant="success" type="submit">Edit</Button>}
      </Form>
    </>
  );

}

export default AnswerForm;
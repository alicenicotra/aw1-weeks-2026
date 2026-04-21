import './App.css';

import NavHeader from './components/NavHeader';

import { Question, Answer } from './QAModels';

const question = new Question(1, "Is Javascripst better than Python?", "luigi.derussis@polito.it", 1, "2026-03-30");
const answer = [
  new Answer(1, "Yes, it is!", "luca.scibetta@polito.it", 1, "2026-03-30")];


function App() {
  return (<>
    <NavHeader id="nav-header"/>
  </>);
}

export default App;

// import
import express from "express";
import morgan from "morgan";
import { listQuestions, getQuestion, voteAnswer } from "./dao.js";
import { check, validationResult } from "express-validator";

// init
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan("dev"));

/* ROUTES */
// GET /api/questions
app.get("/api/questions", (request, response) => {
  listQuestions()
    .then(questions => response.json(questions))
    .catch(() => response.status(500).end());
});

// GET /api/questions/<id>
app.get("/api/questions/:id", async (req, res) => {
  try {
    const question = await getQuestion(req.params.id);
    if(question.error) {
      res.status(404).json(question);
    }
    else res.json(question);
  }
  catch {
    res.status(500).end();
  }
});

// POST /api/answers/<id>/vote
app.post("/api/answers/:id/vote", [
  check("vote").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.notEmpty) {
    res.status(422).json({errors: errors.array()});
  }

  try {
    const num = await voteAnswer(req.params.id, req.body.vote);
    if(num === 1)
      res.status(204).end();
    else
      throw new Error(`Error in casting a vote for answer #${req.params.id}`);
  }
  catch(e) {
    res.status(503).json({error: e.message});
  }
})

// start the server
app.listen(port, () => {console.log(`API server started at http://localhost:${port}`)});

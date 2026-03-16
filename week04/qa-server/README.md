# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### Summary
- list the questions GET /questions
- get a single question GET /questions/<id>
- list the answers GET /answers
- add a new answer POST /answers
- update an existing answer PUT /answers/<id>
- vote for an answer POST /answers/<id>/vote

### __List the questions__

URL: `/api/questions`

HTTP Method: GET

Description: Retrieve all the questions.

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of questions in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "text": "Is JavaScript better than Python?",
    "author": {
      "email": "luigi.derussis@polito.it",
      "id": 1
    },
    "date": "2026-02-26"
  },
  ...
]
```

### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET

Description: Retrieve the question identified by <id>.

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). In case of success, returns a question in JSON format (see below); otherwise, an error message.

Response body:
```
{
  "id": 1,
  "text": "Is JavaScript better than Python?",
  "author": {
    "email": "luigi.derussis@polito.it",
    "id": 1
  },
  "date": "2026-02-26"
}
```

### __Update an answer__

URL: `/api/answer/<id>`

HTTP Method: PUT

Description: Update the answer identified by <id>.

Request body:
```
{
  "text": "Maybe!",
  "author": {
    "email": "luigi.derussis@polito.it",
    "id": 1
  },
  "date": "2026-03-16"
}
```

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

### __Vote for an answer__

URL: `/api/answer/<id>/vote`

HTTP Method: POST

Description: Upvote (+1) or downvote (-1) the answer identified by <id>.

Request body:
```
{
  "vote": "up"
}
```

Response: `204 No content` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).
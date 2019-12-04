import React, { useEffect, useState } from "react";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { Button } from "@material-ui/core";
import Result from "../Components/result";

const Quiz = props => {
  let url = "http://localhost:8080/generateQuiz/";
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState(new Map());
  let [correctAnswers, setCorrectAnswers] = useState(new Map());
  let [submit, setSubmit] = useState(false);
  let [marks, setMarks] = useState(0);
  let [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get(url + props.username)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(err => alert(err));
  }, []);

  const handleChange = (index, event) => {
    var answer;
    answer = answers;
    answer.set(index, event.target.value);
    setAnswers(answer);
  };

  const result = () => {
    let correctAnswers = new Map();
    let size = questions.length;
    let marks = 0;
    questions.map((question, index) => {
      correctAnswers.set(index, question.answer);
    });
    for (var i = 0; i < size; i++) {
      if (answers.has(i)) {
        if (answers.get(i) === correctAnswers.get(i)) marks = marks + 1;
      }
    }
    setMarks(marks);
    setScore(size);
    setSubmit(true);
  };

  var content = null;
  if (!submit) {
    content = (
      <div>
        {questions.map((question, index) => (
          <div>
            <h5>
              <b>{index + 1} .whats the meaning of </b> {question.question}
            </h5>
            <RadioGroup name={index}>
              {question.options.map(option => (
                <FormControlLabel
                  onChange={handleChange.bind(this, index)}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button color="inherit" variant="outlined" onClick={result}>
          submit
        </Button>
      </div>
    );
  } else {
    content = <Result marks={marks} score={score} />;
  }

  return <div>{content}</div>;
};

export default Quiz;

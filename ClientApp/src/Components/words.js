import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import LearntWords from "./learntWords";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Quiz from "../Components/Quiz";

const Words = props => {
  let [data, setData] = useState([]);
  let [info, setInfo] = useState([]);
  let [flag, setFlag] = useState([false, false, false, false, false, false]);
  let [index, setIndex] = useState(0);
  let [word, setWord] = useState("");
  let [quiz, setQuiz] = useState(false);
  let [learnt, setLearnt] = useState(false);

  let url = "http://localhost:8080/";

  const randomWords = () => {
    setLearnt(false);
    let info = [];
    let index = Math.floor(Math.random() * 10) % data.length;
    for (let i = 0; i < 6; i++) {
      info.push(data[index]);
      if (index == data.length - 1) index = 1;
      index++;
    }
    setInfo(info);
  };
  const learntWords = () => {
    setLearnt(true);
  };

  const learn = (word, index) => {
    let flagd;
    flagd = flag;
    flagd[index] = true;
    setFlag(flagd);
    setIndex(index);
    setWord(word);
  };

  useEffect(() => {
    axios
      .get(url + "words")
      .then(response => {
        setData(response.data);
      })
      .catch(err => alert("didnt fetch"));
  }, []);

  useEffect(() => {
    if (flag[index]) {
      axios
        .post(url + "learnt", { username: props.username, word: word })
        .then(response => {
          console.log("rahul");
        })
        .catch(err => alert(err));
      let dflag;
      dflag = flag;
      dflag[index] = false;
      setFlag(dflag);
    }
  }, [flag, index, words]);
  var words = null;
  if (learnt) {
    words = <LearntWords username={props.username} />;
  } else {
    words = (
      <Table>
        <TableHead className="bod">
          <TableCell style={{ color: "white" }}>word</TableCell>
          <TableCell style={{ color: "white" }}>meaning</TableCell>
        </TableHead>
        {info.map((data, index) => {
          return (
            <TableRow>
              <TableCell>{data.word}</TableCell>
              <TableCell>{data.meaning}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => learn(data.word, index)}
                >
                  learnt
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    );
  }
  if (quiz === true) words = <Quiz username={props.username} />;

  return (
    <div>
      <AppBar color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            GRE PREP
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br></br>
      <Button onClick={randomWords} variant="outlined" color="inherit">
        showWords
      </Button>
      <Button onClick={quiz} variant="outlined" color="inherit">
        Take a Quiz
      </Button>
      <Button onClick={learntWords} variant="outlined" color="inherit">
        learntWords
      </Button>
      <div align="right">
        <Button
          onClick={props.callBack}
          variant="outlined"
          color="inherit"
          align="right"
        >
          logout
        </Button>
      </div>
      {words}
    </div>
  );
};

export default Words;

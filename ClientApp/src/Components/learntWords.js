import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const LearntWords = props => {
  let [learntwords, setLearntWords] = useState([]);
  let [flag, setFlag] = useState(false);

  let url = "http://localhost:8080/";
  let username = props.username;

  useEffect(() => {
    fetch(url + username)
      .then(response => response.json())
      .then(data => {
        setLearntWords(data);
      });
  }, []);

  return (
    <Table>
      <TableHead className="bod">
        <TableCell style={{ color: "white" }}>word</TableCell>
        <TableCell style={{ color: "white" }}>meaning</TableCell>
      </TableHead>
      {learntwords.map(data => {
        return (
          <TableRow>
            <TableCell>{data.word}</TableCell>
            <TableCell>{data.meaning}</TableCell>
            <TableCell>
              <Button variant="outlined" color="inherit">
                learnt
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default LearntWords;

import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "../App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Auth = props => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let url = "http://localhost:8080/verify";

  let submit = () => {
    props.rememberUserName(username);
    fetch(url + "/" + username + "/" + password)
      .then(response => response.json())
      .then(data => {
        if (data) props.callBack();
      });
  };

  let hanldleChange = event => {
    setUsername(event.target.value);
  };

  let hanldleChangepass = event => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <AppBar color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            GRE PREP
          </Typography>
        </Toolbar>
      </AppBar>
      <div align="Center">
        <Box m={20} />
        <Box boxShadow={3} style={{ width: "25rem", height: "20rem" }}>
          <br />
          <br />
          <br></br>
          <TextField
            name="username"
            onChange={hanldleChange}
            helperText="enter your username"
            variant="filled"
            required="true"
            label="username"
          />
          <br />
          <br />

          <TextField
            name="password"
            onChange={hanldleChangepass}
            helperText="enter your password"
            variant="filled"
            required="true"
            label="password"
          />
          <br />
          <br />
          <Button variant="outlined" color="inherit" onClick={submit}>
            submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Auth;

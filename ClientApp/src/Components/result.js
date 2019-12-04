import React from "react";
import Typography from "@material-ui/core/Typography";

const Result = props => {
  return (
    <div>
      <Typography align="center" color="primary" variant="body1">
        congrats you got {props.marks}/{props.score}
      </Typography>
    </div>
  );
};

export default Result;

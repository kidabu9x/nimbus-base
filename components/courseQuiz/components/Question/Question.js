/* eslint-disable react/prop-types */
import React from "react";
import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";

// const styles = makeStyles(theme => ({}));

const Question = props => {
  const { question, index, total } = props;
  //   const classes = styles();
  if (!question) return null;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Câu {index + 1}/{total}
      </Typography>
      <div>{question}</div>
    </div>
  );
};

export default Question;

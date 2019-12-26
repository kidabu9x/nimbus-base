/* eslint-disable react/prop-types */
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  questionIndex: {
    marginBottom: theme.spacing(1.5)
  }
}));

const Question = props => {
  const { question, index, total } = props;
  const classes = styles();
  if (!question) return null;

  return (
    <div>
      <Typography
        className={classes.questionIndex}
        variant="body2"
        gutterBottom
      >
        Câu {index + 1}/{total}
      </Typography>
      <Typography variant="h5">{question}</Typography>
    </div>
  );
};

export default Question;

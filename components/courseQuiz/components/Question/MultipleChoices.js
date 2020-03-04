/* eslint-disable react/prop-types */
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { green } from "@material-ui/core/colors";

const styles = makeStyles(theme => ({
  answers: {
    padding: theme.spacing(0.5, 0),
    listStyle: "none",
    marginTop: theme.spacing(0.5)
  },
  answer: {
    display: "flex",
    marginBottom: theme.spacing(2)
  },
  answerCheckbox: {
    height: "max-content"
  },
  answerCheckboxDefault: {
    "&.Mui-checked": {
      color: green[600]
    }
  },
  answerDetail: {
    paddingTop: 7,
    cursor: "pointer",
    flex: 1
  }
}));

const Answer = props => {
  const { answer, classes, submitted, toggleUserChoice } = props;
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(answer.user_choice);
  }, [answer]);
  const toggleCheckbox = () => {
    if (!submitted) {
      setChecked(!checked);
      toggleUserChoice();
    }
  };
  return (
    <li className={classes.answer}>
      <Checkbox
        disabled={submitted}
        className={`${classes.answerCheckbox} ${classes.answerCheckboxDefault}`}
        checked={checked}
        onChange={toggleCheckbox}
      />
      <Typography
        variant="subtitle1"
        className={classes.answerDetail}
        onClick={toggleCheckbox}
      >
        {answer.answer}
      </Typography>
    </li>
  );
};

const Answers = props => {
  const { answers, submitted } = props;
  const classes = styles();
  const toggleUserChoice = index => {
    if (!submitted) {
      answers[index].user_choice = !answers[index].user_choice;
    }
  };
  return (
    <ul className={classes.answers}>
      {answers.map((answer, index) => (
        <Answer
          key={answer._id}
          submitted={submitted}
          classes={classes}
          answer={answer}
          toggleUserChoice={() => toggleUserChoice(index)}
        />
      ))}
    </ul>
  );
};

export default Answers;

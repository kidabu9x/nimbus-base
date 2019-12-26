/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Logo from "../../../logo.svg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  title: {
    fontSize: 24,
    paddingTop: theme.spacing(2)
  },
  logo: {},
  inputWrapper: {
    paddingTop: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(5),
    display: "flex"
  },
  actionWrapper: {
    flexGrow: 1,
    textAlign: "left"
  },
  actionWrapperRight: {
    textAlign: "right"
  },
  action: {
    textTransform: "unset"
  }
}));

const ValidateCode = props => {
  const [quizId, setQuizId] = useState("");
  const { quizzes, quiz, onSetQuiz, onSetStep } = props;

  const classes = styles();

  useEffect(() => {
    if (quiz) {
      setQuizId(quiz._id);
    } else if (quizzes.length) {
      setQuizId(quizzes[0]._id);
    }
  }, [quiz]);

  const onSubmit = () => {
    onSetQuiz(quizId);
  };

  const onBack = () => {
    onSetStep(1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src={Logo} alt="logo" width={60} />
      </div>
      <Typography
        className={classes.title}
        variant="h5"
        align="center"
        gutterBottom
      >
        Chọn bài trắc nghiệm
      </Typography>

      <div className={classes.inputWrapper}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="position"
            name="position"
            value={quizId}
            onChange={e => setQuizId(e.target.value)}
          >
            {quizzes.map(quiz => (
              <FormControlLabel
                key={quiz._id}
                value={quiz._id}
                control={<Radio color="primary" />}
                label={quiz.title}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.actions}>
        <div className={classes.actionWrapper}>
          <Button color="primary" className={classes.action} onClick={onBack}>
            Nhập mã khác
          </Button>
        </div>
        <div
          className={`${classes.actionWrapper} ${classes.actionWrapperRight}`}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.action}
            onClick={onSubmit}
          >
            Làm bài
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidateCode;

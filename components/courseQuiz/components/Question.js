/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import QuestionDetail from "./Question/Question";
import Actions from "./Question/Actions";

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "left"
  }
}));

const Question = props => {
  const {
    questions,
    questionIndex,
    menuAvailable,
    bookmarks,
    // showMenu,
    onSetQuestionIndex,
    onToggleShowMenu,
    onBookmark
  } = props;
  const classes = styles();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (questions[questionIndex]) {
      setQuestion(questions[questionIndex]);
    }
  }, [questions, questionIndex]);

  if (!question) return null;

  return (
    <div className={classes.root}>
      <QuestionDetail
        question={question.question}
        index={questionIndex}
        total={questions.length}
      />
      <Actions
        index={questionIndex}
        total={questions.length}
        menuAvailable={menuAvailable}
        bookmarks={bookmarks}
        onSetIndex={onSetQuestionIndex}
        onShowMenu={onToggleShowMenu}
        onBookmark={onBookmark}
      />
    </div>
  );
};

export default Question;

/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import QuestionDetail from "./Question/Question";
import Answers from "./Question/Answers";
import Actions from "./Question/Actions";

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: "left",
    backgroundColor: "#fff",
    height: "100vh",
    boxSizing: "border-box"
  }
});

class Question extends Component {
  state = {
    question: null
  };

  shouldComponentUpdate() {
    return !this.state.question;
  }

  componentDidMount() {
    const { questions, questionIndex } = this.props;
    this.setState({
      question: questions[questionIndex] ? questions[questionIndex] : null
    });
  }

  render() {
    const {
      classes,

      loading,
      questions,
      questionIndex,
      menuAvailable,
      bookmarks,
      onSetQuestionIndex,
      onToggleShowMenu,
      onBookmark
    } = this.props;

    const { question } = this.state;

    if (!question) return null;

    return (
      <div className={classes.root}>
        <QuestionDetail
          question={question.question}
          index={questionIndex}
          total={questions.length}
        />
        <Answers type={question.type} answers={question.answers} />
        <Actions
          loading={loading}
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
  }
}

export default withStyles(styles)(Question);

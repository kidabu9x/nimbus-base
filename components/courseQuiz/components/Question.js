/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import QuestionDetail from "./Question/Question";
import MultipleChoices from "./Question/MultipleChoices";
import Pairing from "./Question/Pairing";
import Actions from "./Question/Actions";

const styles = () => ({
  root: {
    textAlign: "left"
  }
});

const Answers = props => {
  const { question, type, submitted } = props;
  switch (type) {
    case "multiple_choices":
      return (
        <MultipleChoices submitted={submitted} answers={question.answers} />
      );

    case "pairing":
      return (
        <Pairing
          submitted={submitted}
          answers={question.answers}
          pairingAnswers={question.pairing_answers}
          tempPairingAnswers={question.temporary_pairing_answers}
        />
      );

    default:
      return null;
  }
};

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
      submitted,

      onSetQuestionIndex,
      onToggleMenuAvailable,
      onSetStep,
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
        <Answers
          submitted={submitted}
          type={question.type}
          question={question}
        />
        <Actions
          loading={loading}
          index={questionIndex}
          total={questions.length}
          menuAvailable={menuAvailable}
          bookmarks={bookmarks}
          onSetIndex={onSetQuestionIndex}
          onToggleMenuAvailable={onToggleMenuAvailable}
          onSetStep={onSetStep}
          onBookmark={onBookmark}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Question);

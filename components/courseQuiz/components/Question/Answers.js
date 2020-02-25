/* eslint-disable react/prop-types */
import React from "react";
import MultipleChoices from "./Answers/MultipleChoices";
const Answers = props => {
  const { answers, type, submitted } = props;
  switch (type) {
    case "multiple_choices":
      return <MultipleChoices submitted={submitted} answers={answers} />;
    default:
      return null;
  }
};

export default Answers;

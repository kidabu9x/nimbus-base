/* eslint-disable react/prop-types */
import React from "react";
import MultipleChoices from "./Answers/MultipleChoices";
import Pairing from "./Answers/Pairing";
const Answers = props => {
  const { answers, type, submitted } = props;
  switch (type) {
    case "multiple_choices":
      return <MultipleChoices submitted={submitted} answers={answers} />;

    case "pairing":
      return <Pairing submitted={submitted} answers={answers} />;

    default:
      return null;
  }
};

export default Answers;

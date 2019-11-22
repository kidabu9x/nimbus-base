import React from "react";
import PropTypes from "prop-types";
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

Question.propTypes = {
  question: PropTypes.string,
  index: PropTypes.number,
  total: PropTypes.number
};

export default Question;

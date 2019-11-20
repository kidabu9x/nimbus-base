import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  title: {
    fontSize: 24,
    paddingTop: theme.spacing(2)
  },
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

const Question = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        align="center"
        gutterBottom
      >
        Làm bài
      </Typography>
    </div>
  );
};

Question.propTypes = {
  questions: PropTypes.array,
  quiz: PropTypes.object
};

export default Question;

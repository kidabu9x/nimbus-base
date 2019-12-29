/* eslint-disable react/prop-types */
import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import { grey, yellow, green, red } from "@material-ui/core/colors";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";

const styles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  },
  headerContainer: {
    borderBottom: "1px solid " + grey[200],
    padding: theme.spacing(2, 2, 0.75, 2),
    backgroundColor: "#fff"
  },
  itemsContainer: {
    listStyle: "none",
    backgroundColor: "#fff",
    margin: 0,
    padding: theme.spacing(1, 2, 2, 2),
    overflowY: "auto",
    marginBottom: theme.spacing(1),
    flexGrow: 1
  },
  wrapper: {
    display: "flex"
  },
  item: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.75, 0),
    borderBottom: "1px solid " + grey[50]
  },
  bookmarkIcon: {
    color: yellow[700]
  },
  doneIcon: {
    color: green[600]
  },
  errorIcon: {
    color: red[400]
  },
  actionsContainer: {
    flexShrink: 0,
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(2, 2, 3, 2),
    boxSizing: "border-box",
    backgroundColor: "#fff"
  },
  actionPrimary: {
    fontSize: 15
  }
}));

const Header = ({ classes }) => {
  return (
    <div className={`${classes.headerContainer}`}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="body2" align="left">
            STT
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Kết quả</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Đánh dấu</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const Question = ({
  index,
  classes,
  isBookmarked,
  submitted,
  isCorrect,
  onGoToQuestion
}) => {
  const handleClick = () => {
    onGoToQuestion(index);
  };
  return (
    <li className={`${classes.item}`} onClick={handleClick}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="body1" align="left">
            {index + 1}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {submitted ? (
            isCorrect ? (
              <DoneIcon className={classes.doneIcon} />
            ) : (
              <ErrorIcon className={classes.errorIcon} />
            )
          ) : null}
        </Grid>
        <Grid item xs={4}>
          {isBookmarked ? (
            <BookmarkIcon className={classes.bookmarkIcon} />
          ) : null}
        </Grid>
      </Grid>
    </li>
  );
};

const Actions = ({ classes, submitting, onSubmitClick }) => {
  return (
    <div className={`${classes.actionsContainer}`}>
      {submitting ? (
        <CircularProgress size="38px" />
      ) : (
        <Button
          className={`${classes.actionPrimary}`}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={onSubmitClick}
        >
          Chấm điểm
        </Button>
      )}
    </div>
  );
};

const Result = ({ classes, totalQuestions, totalCorrectQuestions }) => {
  return (
    <div className={classes.actionsContainer}>
      Bạn đã làm đúng: {totalCorrectQuestions} / {totalQuestions} câu
    </div>
  );
};

const Summary = props => {
  const {
    questions,
    bookmarks,
    submitting,
    submitted,
    totalQuestions,
    totalCorrectQuestions,
    onSetQuestionIndex,
    onSubmit
  } = props;
  const classes = styles();

  const onGoToQuestion = index => {
    if (!submitting) {
      onSetQuestionIndex(index);
    }
  };

  const onSubmitClick = () => {
    if (!submitted && !submitting) onSubmit();
  };

  return (
    <div className={classes.root}>
      <Header classes={classes} />
      <ul className={classes.itemsContainer}>
        {questions.map((question, index) => (
          <Question
            key={question._id}
            classes={classes}
            index={index}
            isBookmarked={bookmarks.indexOf(index) > -1}
            isCorrect={question.is_match}
            submitted={submitted}
            onGoToQuestion={onGoToQuestion}
          />
        ))}
      </ul>
      {!submitted ? (
        <Actions
          classes={classes}
          submitting={submitting}
          submitted={submitted}
          onSubmitClick={onSubmitClick}
        />
      ) : (
        <Result
          classes={classes}
          totalQuestions={totalQuestions}
          totalCorrectQuestions={totalCorrectQuestions}
        />
      )}
    </div>
  );
};

export default Summary;

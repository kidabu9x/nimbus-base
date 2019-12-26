/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { grey, yellow } from "@material-ui/core/colors";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const styles = makeStyles(theme => ({
  root: {
    listStyle: "none",
    padding: 0
  },
  wrapper: {
    display: "flex"
  },
  listItem: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.75, 0),
    borderBottom: "1px solid " + grey[50]
  },
  headerListItem: {
    borderBottom: "1px solid " + grey[200]
  },
  bookmarkIcon: {
    color: yellow[700]
  }
}));

const Header = ({ classes }) => {
  return (
    <li className={`${classes.headerListItem} ${classes.listItem}`}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="body2" align="left">
            STT
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Đánh dấu</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Kết quả</Typography>
        </Grid>
      </Grid>
    </li>
  );
};

const Question = ({ index, classes, isBookmarked }) => {
  return (
    <li className={`${classes.listItem}`}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="body1" align="left">
            {index}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {isBookmarked ? (
            <BookmarkIcon className={classes.bookmarkIcon} />
          ) : null}
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Kết quả</Typography>
        </Grid>
      </Grid>
    </li>
  );
};

const Summary = props => {
  const { questions, bookmarks } = props;
  const classes = styles();
  return (
    <ul className={classes.root}>
      <Header classes={classes} />
      {questions.map((question, index) => (
        <Question
          key={question._id}
          classes={classes}
          index={index}
          isBookmarked={bookmarks.indexOf(index) > -1}
        />
      ))}
    </ul>
  );
};

export default Summary;

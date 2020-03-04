/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const styles = theme => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(4)
  },
  actions: {},
  actionsRight: {
    flex: 1,
    textAlign: "right"
  },
  button: {
    textTransform: "unset"
  },
  bookmarkedButton: {
    backgroundColor: "#f1c40f",
    color: "#fff",
    marginRight: theme.spacing(0.5)
  },
  buttonNoPdLeft: {
    paddingLeft: 0
  },
  buttonNoPdRight: {
    paddingRight: 0
  },
  iconLeft: {
    marginRight: theme.spacing(0.5)
  },
  iconRight: {
    marginLeft: theme.spacing(0.5)
  }
});

class Actions extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.bookmarks === this.props.bookmarks) {
      return false;
    }
    return true;
  }

  render() {
    const {
      classes,
      loading,
      index,
      total,
      menuAvailable,
      bookmarks,
      onBookmark,
      onToggleMenuAvailable,
      onSetStep,
      onSetIndex
    } = this.props;

    const buttonSize = "medium";

    const nextQuest = () => {
      onSetIndex(index + 1);
    };

    const backQuest = () => {
      onSetIndex(index - 1);
    };

    const onMenuClick = () => {
      onToggleMenuAvailable();
      onSetStep(4);
    };
    return (
      <div className={classes.root}>
        {index > 0 && !menuAvailable ? (
          <div className={classes.actions}>
            <Button
              className={`${classes.button} ${classes.buttonNoPdLeft}`}
              size={buttonSize}
              disabled={loading}
              onClick={backQuest}
            >
              <NavigateBeforeIcon />
              Câu trước
            </Button>
          </div>
        ) : null}
        <div className={classes.actionsRight}>
          {bookmarks.indexOf(index) > -1 ? (
            <Button
              className={`${classes.button} ${classes.bookmarkedButton}`}
              size={buttonSize}
              disabled={loading}
              onClick={onBookmark}
            >
              Hủy
              <BookmarkIcon />
            </Button>
          ) : (
            <Button
              className={`${classes.button}`}
              size={buttonSize}
              disabled={loading}
              onClick={onBookmark}
            >
              Đánh dấu
              <BookmarkBorderIcon />
            </Button>
          )}

          {menuAvailable || index === total - 1 ? (
            <Button
              className={`${classes.button}`}
              size={buttonSize}
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={onMenuClick}
            >
              Trình đơn
            </Button>
          ) : (
            <Button
              className={`${classes.button}`}
              size={buttonSize}
              disabled={loading}
              onClick={nextQuest}
            >
              Câu tiếp
              <NavigateNextIcon />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Actions);

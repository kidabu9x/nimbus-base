import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const styles = makeStyles(theme => ({
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
  bookedButton: {},
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
}));

const Actions = props => {
  const {
    index,
    total,
    menuAvailable,
    bookmarks,
    onBookmark,
    onShowMenu,
    onSetIndex,
    onToggleMenuAvailable
  } = props;
  const [booked, setBooked] = useState(false);
  const buttonSize = "medium";
  const classes = styles();

  useEffect(() => {
    setBooked(bookmarks.indexOf(index) > -1);
  }, [bookmarks, index, onBookmark]);

  const nextQuest = () => {
    onSetIndex(index + 1);
  };

  const backQuest = () => {
    onSetIndex(index - 1);
  };

  const onMenuClick = () => {
    if (!menuAvailable) onToggleMenuAvailable();
    onShowMenu();
  };

  return (
    <div className={classes.root}>
      {index > 0 && !menuAvailable ? (
        <div className={classes.actions}>
          <Button
            className={`${classes.button} ${classes.buttonNoPdLeft}`}
            size={buttonSize}
            onClick={backQuest}
          >
            <NavigateBeforeIcon />
            Câu trước
          </Button>
        </div>
      ) : null}
      <div className={classes.actionsRight}>
        {booked ? (
          <Button
            className={`${classes.button} ${classes.bookedButton}`}
            size={buttonSize}
            onClick={onBookmark}
          >
            Hủy
            <BookmarkIcon />
          </Button>
        ) : (
          <Button
            className={`${classes.button}`}
            size={buttonSize}
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
            onClick={onMenuClick}
          >
            Trình đơn
          </Button>
        ) : (
          <Button
            className={`${classes.button}`}
            size={buttonSize}
            onClick={nextQuest}
          >
            Câu tiếp
            <NavigateNextIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

Actions.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number,
  menuAvailable: PropTypes.bool,
  bookmarks: PropTypes.array,
  onBookmark: PropTypes.func,
  onShowMenu: PropTypes.func,
  onSetIndex: PropTypes.func,
  onToggleMenuAvailable: PropTypes.func
};

export default Actions;

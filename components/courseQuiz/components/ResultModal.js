/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    "&:focus": {
      outline: "none"
    }
  },
  title: {
    padding: theme.spacing(1, 4, 0, 4),
    color: theme.palette.primary.light
  },
  body: {
    padding: theme.spacing(2, 4)
  },
  confirmBtn: {
    borderRadius: "0 0 4px 4px"
  }
});

class TransitionsModal extends Component {
  state = {
    correct: 0,
    total: 0
  };

  static getDerivedStateFromProps(props) {
    const { questions } = props;
    return {
      correct: questions.filter(q => q.is_match).length,
      total: questions.length
    };
  }

  render() {
    const { classes, open, toggle } = this.props;
    const { correct, total } = this.state;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.title}>
              <Typography variant="subtitle1" align="center">
                Chúc mừng
              </Typography>
            </div>

            <Divider light />

            <div className={classes.body}>
              <Typography variant="h4" align="center" gutterBottom>
                {correct}/{total}
              </Typography>

              <Typography variant="body2" align="center" color="textSecondary">
                Là kết quả của bạn trong bài test này
              </Typography>
            </div>

            <Divider light />

            <Button
              className={classes.confirmBtn}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disableElevation
              onClick={toggle}
            >
              OK
            </Button>
          </div>
        </Fade>
      </Modal>
    );
  }
}

export default withStyles(useStyles)(TransitionsModal);

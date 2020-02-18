/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none"
    }
  },
  confirmBtn: {
    marginTop: theme.spacing(2)
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const { open, toggle } = props;

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
          <Typography variant="h5" align="center">
            Đã có lỗi xảy ra
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Vui lòng thử lại
          </Typography>

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

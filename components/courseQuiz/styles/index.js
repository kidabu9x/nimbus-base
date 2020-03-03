/* eslint-disable react/prop-types */
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: grey[100],
    minHeight: "100vh"
  },
  loadingBar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%"
  },
  container: {
    textAlign: "center",
    maxWidth: 450,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: theme.spacing(6, 5, 4),
      borderRadius: theme.spacing(1),
      maxWidth: 650
    }
  },
  wrapper: {
    position: "relative",
    backgroundColor: "#fff",
    textAlign: "left",
    maxHeight: "100vh",
    padding: theme.spacing(8, 5),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      padding: theme.spacing(3),
      borderRadius: 0
    }
  }
});

export default styles;

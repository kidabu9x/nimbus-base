/* eslint-disable react/prop-types */
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
    backgroundColor: grey[100]
  },
  loadingBar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%"
  },
  container: {
    maxWidth: 450,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #dadce0",
      padding: theme.spacing(6, 5, 4),
      borderRadius: theme.spacing(1)
    }
  },
  wrapper: {
    position: "relative"
  }
});

export default styles;

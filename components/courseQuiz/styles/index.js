/* eslint-disable react/prop-types */
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: grey[100],
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center"
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
    width: "100%",
    position: "relative",
    backgroundColor: "#fff",
    maxHeight: "100vh",
    padding: theme.spacing(8, 5, 4),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      maxWidth: 650
    },
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      padding: theme.spacing(3),
      borderRadius: 0
    }
  }
});

export default styles;

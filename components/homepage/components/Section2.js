import React from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxHeight: "300px"
  },
  brandText: {
    color: "#207347",
    textAlign: "center",
    width: "100%",
    margin: theme.spacing(8, 0)
  }
}));

const Section1 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.brandText}>
        <Typography variant="h4" color="inherit" gutterBottom>
          Chào Mừng Đến
        </Typography>
        <Typography variant="h2" color="textPrimary" gutterBottom>
          Nimbus Hub!
        </Typography>
      </div>
    </div>
  );
};

export default Section1;

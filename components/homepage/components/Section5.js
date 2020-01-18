import React from "react";
import Banner from "../../../assets/images/banner-3.jpg";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: "url(" + Banner + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    border: 0,
    height: "50vh",
    display: "flex",
    position: "relative",
    maxHeight: "700px",
    transform: "translate(0, 0, 0)"
  },
  brandText: {
    position: "absolute",
    top: "50%",
    left: "15%",
    transform: "translateY(-50%)",
    color: "white",
    maxWidth: "340px"
  }
}));

const Section1 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.brandText}>
        <Typography variant="h3" color="inherit" gutterBottom>
          PLATFORM
        </Typography>
        <Typography variant="h3" color="inherit" gutterBottom>
          HỌC ONLINE
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="http://khoahoc.nimbus.edu.vn"
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
};

export default Section1;

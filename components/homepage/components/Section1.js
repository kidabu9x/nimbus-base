import React from "react";
import Banner from "../../../assets/images/banner-1.jpg";
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
    right: "20%",
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
          KHÔNG GIAN
        </Typography>
        <Typography variant="h3" color="inherit" gutterBottom>
          HỌC TẬP
        </Typography>
        <Typography variant="h3" color="inherit" gutterBottom>
          SỐ 1 VIỆT NAM
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="http://ladi.demopage.me/5e22baa3436c88715b12fee0"
        >
          Tìm hiểu ngay
        </Button>
      </div>
    </div>
  );
};

export default Section1;

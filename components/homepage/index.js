/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Banner4 from "../../assets/images/banner-4.jpg";
import Banner5 from "../../assets/images/banner-5.jpg";

const styles = makeStyles(theme => ({
  root: {
    backgroundImage: "url(" + Banner4 + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexWrap: "wrap",
    height: "100vh"
  },
  pannelLeft: {
    flex: "0 0 60%"
  },
  pannelRight: {
    flex: "0 0 40%",
    backgroundImage: "url(" + Banner5 + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
    padding: theme.spacing(8, 4),
    boxSizing: "border-box"
  },
  btnLink: {
    fontSize: "2.4rem",
    color: "#fff",
    textTransform: "unset",
    marginTop: theme.spacing(2)
  }
}));

const BtnLink = props => {
  const { text, link, classes } = props;
  return (
    <div>
      <Button
        className={classes.btnLink}
        variant="link"
        color="primary"
        href={link}
      >
        {text}
      </Button>
    </div>
  );
};

const Home = () => {
  const classes = styles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.pannelLeft}></div>
        <div className={classes.pannelRight}>
          <BtnLink
            classes={classes}
            link="http://study-hub.nimbus.edu.vn/"
            text="Không gian học tập"
          />
          <BtnLink
            classes={classes}
            link="http://study-hub.nimbus.edu.vn/gioi-thieu"
            text="Giới thiệu"
          />
          <BtnLink
            classes={classes}
            link="http://study-hub.nimbus.edu.vn/gioi-thieu"
            text="IC3 - ICDL - MOS"
          />
          <BtnLink classes={classes} link="#" text="Sự kiện" />
          <BtnLink
            classes={classes}
            link="https://blog.nimbus.edu.vn"
            text="Blog"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

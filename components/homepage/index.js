/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";

import Logo from "../../assets/images/logo-white.svg";
import Banner4 from "../../assets/images/banner-4.jpg";
import Banner5 from "../../assets/images/banner-5.jpg";

const styles = makeStyles(theme => ({
  root: {
    backgroundImage: "url(" + Banner4 + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      position: "relative"
    }
  },
  pannelLeft: {
    flex: "0 0 60%"
  },
  pannelRight: {
    flex: "0 0 40%",
    background: "url(" + Banner5 + ") no-repeat center center",
    color: "#ffffff",
    padding: theme.spacing(8),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      background: "rgba(32, 115, 71, .8)",
      textAlign: "center",
      height: "100vh"
    }
  },
  btnContainer: {
    flex: 1
  },
  btnLink: {
    display: "block",
    fontSize: "2.4rem",
    color: "#fff",
    textTransform: "unset",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem"
    }
  },
  btnLinkInline: {
    display: "inline-block"
  },
  logoContainer: {
    textAlign: "right",
    height: "60px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginBottom: theme.spacing(2)
    }
  },
  logo: {
    fill: "white"
  },
  footer: {
    height: "60px"
  },
  iconButton: {
    color: "white"
  }
}));

const BtnLink = props => {
  const { text, link, inline, classes } = props;
  return (
    <Button
      className={`${classes.btnLink} ${inline ? classes.btnLinkInline : null}`}
      variant="text"
      color="primary"
      href={link}
    >
      {text}
    </Button>
  );
};

const buttons = [
  {
    link: "http://hub.nimbus.com.vn/",
    text: "Không gian học tập"
  },
  {
    link: "http://ic3.nimbus.com.vn",
    text: "IC3 - ",
    inline: true
  },
  {
    link: "http://www.icdl.edu.vn",
    text: "ICDL - ",
    inline: true
  },
  {
    link: "http://mos.nimbus.com.vn/",
    text: "MOS",
    inline: true
  },
  {
    link: "http://sach.nimbus.com.vn",
    text: "Thư viện sách"
  },
  {
    link: "#",
    text: "Sự kiện"
  },
  {
    link: "https://khoahoc.nimbus.com.vn",
    text: "Học online"
  },
  {
    link: "https://blog.nimbus.com.vn",
    text: "Blog"
  },
  {
    link: "http://hub.nimbus.com.vn/gioi-thieu",
    text: "Giới thiệu"
  }
];

const Home = () => {
  const classes = styles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.pannelLeft}></div>
        <div className={classes.pannelRight}>
          <div className={classes.logoContainer}>
            <img classes={classes.logo} src={Logo} alt="logo" width={80} />
          </div>

          <div className={classes.btnContainer}>
            {buttons.map(btn => (
              <BtnLink
                classes={classes}
                key={btn.link}
                link={btn.link}
                text={btn.text}
                inline={btn.inline}
              />
            ))}
          </div>

          <div className={classes.footer}>
            <IconButton className={classes.iconButton}>
              <FacebookIcon color="inherit" />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <MailIcon color="inherit" />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <PhoneIcon color="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

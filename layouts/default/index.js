import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Base from "../_base";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

const Layout = props => {
  const classes = useStyles();
  return (
    <Base>
      <div className={classes.root}>
        <NavBar />
        <Container component="main" className={classes.main} maxWidth="lg">
          {props.children}
        </Container>
        <Footer className={classes.footer} />
      </div>
    </Base>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;

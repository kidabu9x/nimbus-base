import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Nimbus Computer School
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="body1">Nimbus Hub</Typography>
        <Copyright />
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object
};

export default Footer;

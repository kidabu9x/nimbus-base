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
  },
  wrapper: {
    display: "flex"
  },
  gmap: {
    marginLeft: theme.spacing(4),
    flex: 1,
    textAlign: "right"
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
      <Container className={classes.wrapper} maxWidth="lg">
        <div>
          <Typography variant="h6" gutterBottom>
            Nimbus Hub
          </Typography>
          <Typography variant="body2" gutterBottom>
            Địa chỉ: Tầng 2, Số 5, Ngõ 128, Phố Vọng, Hà Nội
          </Typography>
          <Typography variant="body2" gutterBottom>
            Hotline: 0972 220 777
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: hotro@ladipage.vn
          </Typography>
          <Copyright />
        </div>

        <div className={classes.gmap}>
          <iframe
            width="500"
            height="150"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=128%2C%20Ph%E1%BB%91%20V%E1%BB%8Dng%2C%20H%C3%A0%20N%E1%BB%99i%2C%20Vi%E1%BB%87t%20Nam&t=&z=17&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object
};

export default Footer;

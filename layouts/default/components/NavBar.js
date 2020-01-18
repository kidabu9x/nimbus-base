import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    width: "100%"
  },
  navItems: {
    flex: 1,
    textAlign: "right"
  }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired
};

const Title = () => {
  return <Typography variant="h6">Nimbus Hub</Typography>;
};

const NavItems = props => {
  const { classes } = props;
  return (
    <div className={classes.navItems}>
      <Button color="inherit">Chứng chỉ tin học</Button>

      <Button
        color="inherit"
        href="http://ladi.demopage.me/5e22baa3436c88715b12fee0"
      >
        Không gian học tập
      </Button>

      <Button color="inherit" href="http://khoahoc.nimbus.edu.vn">
        Khóa học online
      </Button>

      <Button color="inherit">Lịch sự kiện</Button>

      <Button color="inherit">Tin tức</Button>

      <Button
        color="inherit"
        href="http://ladi.demopage.me/5e22dcb69a57a7305a442d9f"
      >
        Liên hệ
      </Button>
    </div>
  );
};

NavItems.propTypes = {
  classes: PropTypes.object
};

const NavBar = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <div className={classes.container}>
              <Title />
              <NavItems classes={classes} />
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Fragment>
  );
};

NavBar.propTypes = {
  children: PropTypes.node
};

export default NavBar;

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";

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

const NavBar = props => {
  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Nimbus Hub</Typography>

            <Button color="inherit">Hello</Button>

            <Button color="inherit">World</Button>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { withStyles, Typography } from "@material-ui/core";

const types = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info"
};

const palettes = {
  info: {
    primary: blueGrey[900],
    secondary: blueGrey[400],
    background: blueGrey[50]
  }
};

const styles = theme => ({
  root: {
    display: "flex",
    border: "1px solid rgba(0, 0, 0, .05)",
    borderRadius: "2px",
    padding: theme.spacing(2),
    backgroundColor: palettes.info.background,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  },
  iconWrapper: {
    paddingRight: theme.spacing(2)
  },
  icon: {
    position: "relative",
    display: "block",
    fill: palettes.info.primary
  },
  iconInner: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: -theme.spacing(0.25),
      bottom: -theme.spacing(0.25),
      left: -theme.spacing(0.25),
      right: -theme.spacing(0.25),
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: theme.spacing(0.5) + "px solid " + palettes.info.secondary
    }
  },
  content: {
    flex: 1,
    textAlign: "left"
  },
  title: {
    fontSize: "1rem",
    fontWeight: "600",
    margin: 0,
    padding: theme.spacing(0, 0.25)
  }
});

const Icon = ({ type, overrideClass }) => {
  switch (type) {
    case types.ERROR:
      return <ErrorIcon className={overrideClass} fontSize="small" />;

    case types.SUCCESS:
      return (
        <CheckCircleOutlineIcon className={overrideClass} fontSize="small" />
      );

    case types.WARNING:
      return <WarningIcon className={overrideClass} fontSize="small" />;

    default:
      return <InfoIcon className={overrideClass} fontSize="small" />;
  }
};

Icon.propTypes = {
  type: PropTypes.string,
  overrideClass: PropTypes.string
};

class BannerHeading extends Component {
  render() {
    const { classes, type } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.iconWrapper}>
          <div>
            <span className={classes.iconInner}>
              <Icon overrideClass={classes.icon} type={type} />
            </span>
          </div>
        </div>

        <div className={classes.content}>
          <Typography variant="subtitle2" className={classes.title}>
            Hello world
          </Typography>
          <Typography variant="subtitle1">You are my world</Typography>
        </div>
      </div>
    );
  }
}

BannerHeading.defaultProps = {
  type: types.INFO
};

BannerHeading.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default withStyles(styles)(BannerHeading);

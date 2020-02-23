/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

import { authGoogle } from "../../store/auth/Actions";

import Logo from "../../logo.svg";

const styles = theme => ({
  root: {
    display: "table",
    height: "100vh",
    width: "100%"
  },
  wrapper: {
    display: "table-cell",
    verticalAlign: "middle"
  },
  container: {
    padding: theme.spacing(5, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  progressBar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100vw"
  },
  logo: {
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  subTitle: {
    marginBottom: theme.spacing(2)
  }
});

const mapStateToProps = state => ({
  authorizing: state.auth.authorizing,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = {
  authGoogle
};

class Login extends Component {
  loginSuccess = response => {
    this.onGoogleAuth(response.tokenId);
  };

  componentDidMount() {
    console.log(this.props.isAuthenticated);
  }

  loginFailure = () => {};

  onGoogleAuth = async token => {
    const { authGoogle, router } = this.props;
    await authGoogle(token);
    const redirectTo = router.query.redirect || "/";
    window.location.href = redirectTo;
  };
  render() {
    const { router } = this.props;
    const redirectTo = router.query.redirect;
    const { classes, loading } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {loading ? <LinearProgress className={classes.progressBar} /> : null}
          <div className={classes.container}>
            <div className={classes.logo}>
              <img src={Logo} alt="logo" width={80} />
            </div>
            <Typography variant="h6" className={classes.title}>
              Đăng nhập
            </Typography>
            {redirectTo ? (
              <Typography variant="body2" className={classes.subTitle}>
                Để truy cập {redirectTo}
              </Typography>
            ) : null}
            <GoogleLogin
              clientId="618592701479-s18h0uo27etuful029664069uubo4ho1.apps.googleusercontent.com"
              buttonText="Đăng nhập với Google"
              disabled={loading}
              onSuccess={this.loginSuccess}
              onFailure={this.loginFailure}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Login)));

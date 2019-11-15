import React, { Component } from "react";
import { parseCookies } from "nookies";
import { connect } from "react-redux";
import { auth } from "../store/auth/Actions";

const mapStateToProps = state => ({
  user: state.auth.user
});

const goToLogin = (res, redirect) => {
  const loginUrl = "/dang-nhap?redirect=" + redirect;
  if (res) {
    res.writeHead(302, {
      Location: loginUrl
    });
    res.end();
  } else {
    window.location.href = loginUrl;
  }
};

const RequireAuth = Children => {
  class Higher extends Component {
    static async getInitialProps(ctx) {
      const { res, asPath, reduxStore } = ctx;
      const rootState = reduxStore.getState();
      const { user } = rootState.auth;
      const token = parseCookies(ctx).token;
      let pageProps = {};
      try {
        if (!token) throw new Error("Missing token");
        if (!user) await reduxStore.dispatch(auth());
        if (Children.getInitialProps)
          pageProps = await Children.getInitialProps(ctx);
        pageProps.user = user;
        return {
          ...pageProps
        };
      } catch (error) {
        goToLogin(res, asPath);
      }
    }
    render() {
      return <Children {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    {}
  )(Higher);
};

export default RequireAuth;

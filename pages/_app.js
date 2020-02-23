import App from "next/app";
import React from "react";
import { parseCookies } from "nookies";
import withReduxStore from "../libs/WithReduxStore";
import { Provider } from "react-redux";

import "../common/styles/app.scss";

import Api from "../api";

const setApiAuthentication = ({ token }) => {
  Api.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });
};

class CustomApp extends App {
  static async getInitialProps({ ctx, Component }) {
    const cookies = parseCookies(ctx);
    const { token } = cookies;
    setApiAuthentication({ token });
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { token } = parseCookies();
    setApiAuthentication({ token });

    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(CustomApp);

import React, { Component, Fragment } from "react";
import Login from "../components/login";
import Head from "next/head";

class Render extends Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>Đăng nhập</title>
        </Head>
        <Login />
      </Fragment>
    );
  }
}

export default Render;

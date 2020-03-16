import React, { Component } from "react";
import Layout from "../layouts/default";

import Homepage from "../components/homepage";
import Head from "next/head";

class Home extends Component {
  static async getInitialProps() {
    return {};
  }
  render() {
    return (
      <Layout>
        <Head>
          <title>Nimbus Computer School</title>
        </Head>
        <Homepage />
      </Layout>
    );
  }
}

export default Home;

import React, { Component } from "react";
import Layout from "../layouts/default";

import Homepage from "../components/homepage";

class Home extends Component {
  static async getInitialProps() {
    return {};
  }
  render() {
    return (
      <Layout>
        <Homepage />
      </Layout>
    );
  }
}

export default Home;

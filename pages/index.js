import React, { Component } from "react";
import Layout from "../layouts/default";

class Home extends Component {
  static async getInitialProps({ ctx }) {
    console.log(ctx);
    return {};
  }
  render() {
    return (
      <Layout>
        <h3>We are under construction</h3>
      </Layout>
    );
  }
}

export default Home;

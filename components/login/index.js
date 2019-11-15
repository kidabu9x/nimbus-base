/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import { authGoogle } from "../../store/auth/Actions";

const mapStateToProps = state => ({
  authorizing: state.auth.authorizing
});

const mapDispatchToProps = {
  authGoogle
};

class Login extends Component {
  onGoogleAuth = async token => {
    const { authGoogle, router } = this.props;
    await authGoogle(token);
    const redirectTo = router.query.redirect || "/";
    window.location.href = redirectTo;
  };
  render() {
    const { authorizing, router } = this.props;
    const redirectTo = router.query.redirect;
    return (
      <div>
        <Header />
        <Body
          loading={authorizing}
          redirectTo={redirectTo}
          onGoogleAuth={this.onGoogleAuth}
        />
        <Footer />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));

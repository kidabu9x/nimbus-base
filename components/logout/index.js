/* eslint-disable react/prop-types */
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { logout } from "../../store/auth/Actions";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  logout
};

class Logout extends Component {
  async componentDidMount() {
    const { logout, router } = this.props;
    if (window && window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2) {
        await auth2.signOut();
        await auth2.disconnect();
      }
    }

    logout({
      reload: false
    });
    const redirectTo = router.query.redirect || "/";
    window.location.href = redirectTo;
  }
  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));

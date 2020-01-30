import React from "react";
import PropTypes from "prop-types";

import Base from "../_base";

const Layout = props => {
  // const classes = useStyles();
  return <Base>{props.children}</Base>;
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;

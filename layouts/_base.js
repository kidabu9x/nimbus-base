/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#57975b",
      main: "#2e7d32",
      dark: "#205723"
    },
    secondary: {
      light: "#3398c0",
      main: "#007FB1",
      dark: "#00587b"
    }
  },
  overrides: {
    MuiCard: {
      root: {
        overflow: "none"
      }
    }
  }
});

class Layout extends Component {
  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <style jsx global>{`
          body {
            background: #fff;
            direction: ltr;
            font-size: 15px;
            margin: 0;
            padding: 0;
          }
        `}</style>
        {this.props.children}
      </ThemeProvider>
    );
  }
}

export default Layout;
